package controllers

import (
	"context"
	"fmt"
	"log"

	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"

	// "pro-trader/database"
	"pro-trader/database"
	helper "pro-trader/helpers"
	"pro-trader/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)



var userCollection *mongo.Collection = database.OpenCollection(database.Client, "user")
var validate = validator.New()


func HashPassword(password string) string{

	// stronger cost, more resource intensive
	bytes, err:= bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil{
		log.Panic(err)
	}

	return string(bytes)
}


func VerifyPassword(userPassword string, providedPassword string) (bool, string){
	err:= bcrypt.CompareHashAndPassword([]byte(providedPassword), []byte(userPassword))
	check:= true

	msg:= ""

	if err != nil{
		msg = fmt.Sprint("login or password is incorrect")
		check = false
	}

	return check, msg
}

func SignUp() gin.HandlerFunc{
	return func(c *gin.Context){	
		var ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
		var user models.User


		if err:= c.BindJSON(&user); err != nil{
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return 

		}

		validationError:= validate.Struct(user)


		if validationError != nil{
			c.JSON(http.StatusBadRequest, gin.H{"error": validationError.Error()})
		}

		count, err:= userCollection.CountDocuments(ctx, bson.M{"email": user.Email})
		defer cancel()

		if err!=nil{
			log.Panic(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while checking for the email"})
			return
		}

		password:= HashPassword(*user.Password)
		user.Password = &password
		
		if err != nil {
            log.Panic(err)
            c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while checking for the phone number"})
            return
        }

		if count > 0{
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while checking for the phone number"})
            return

		}
		user.Created_at, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.Updated_at, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.ID = primitive.NewObjectID()
		user.User_id = user.ID.Hex()

		token, refreshToken, _ := helper.GenerateAllTokens(*user.Email, *user.First_name, *user.Last_name, user.User_id)
		user.Token = &token
		user.Refresh_token = &refreshToken

		resultInsertionNumber, insertErr:= userCollection.InsertOne(ctx, user)

		if insertErr!= nil{
			msg:= fmt.Sprintf("user item was no created")
			c.JSON(http.StatusInternalServerError, gin.H{"error":msg})
			return

		}
		defer cancel()

		c.JSON(http.StatusOK, resultInsertionNumber)

	
	}


}



func Login() gin.HandlerFunc{
	return func(c* gin.Context){
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		var user models.User

		var foundUser models.User

		if err:= c.BindJSON(&user); err!= nil{
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

        err := userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&foundUser)
		defer cancel()
		if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "login or password is incorrect"})
			return
		}

		passwordIsValid, msg:= VerifyPassword(*user.Password, *foundUser.Password)
		defer cancel()

		if passwordIsValid != true{
			c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
            return

		}

		token, refreshToken, _ := helper.GenerateAllTokens(*foundUser.Email, *foundUser.First_name, *foundUser.Last_name, foundUser.User_id)

        helper.UpdateAllTokens(token, refreshToken, foundUser.User_id)

        c.JSON(http.StatusOK, foundUser)

	}
}


