package main;


type User struct{
	Username string
	Password string
	Stocks []Stock
	Balance float64
	NetGain float64
}

type Stock struct{
	UserID uint
	Ticker string
	TotalWorth float64
	AveragePrice float64
	QuantityOwned float64
	Gain float32
}