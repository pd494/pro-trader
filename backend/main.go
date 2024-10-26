package main;
import (
	"context"
	_"fmt"
  
	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
  )
  
  func main() {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI("mongodb+srv://protrade:protrade@portfolio.hr5pabx.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio").SetServerAPIOptions(serverAPI)
  
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
	  panic(err)
	}
  
	defer func() {
	  if err = client.Disconnect(context.TODO()); err != nil {
		panic(err)
	  }
	}()
  
  }
  