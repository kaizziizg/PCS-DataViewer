package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	// _ "github.com/go-sql-driver/mysql"
	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

// func connectUnixSocket() (*sql.DB, error) {

// 	// Note: Saving credentials in environment variables is convenient, but not
// 	// secure - consider a more secure solution such as
// 	// Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
// 	// keep secrets safe.
// 	var (
// 		dbUser         = "User"                                          // e.g. 'my-db-user'
// 		dbPwd          = "H3rPUC3OHd7VBb5cqE50"                          // e.g. 'my-db-password'
// 		dbName         = "LOLesport"                                     // e.g. 'my-database'
// 		unixSocketPath = "/cloudsql/pcs-dataviewer:asia-east1:lolesport" // e.g. '/cloudsql/project:region:instance'
// 	)

// 	dbURI := fmt.Sprintf("%s:%s@unix(/%s)/%s?parseTime=true",
// 		dbUser, dbPwd, unixSocketPath, dbName)

// 	// dbPool is the pool of database connections.
// 	dbPool, err := sql.Open("mysql", dbURI)

// 	if err != nil {
// 		return nil, fmt.Errorf("sql.Open: %v", err)
// 	}

// 	// ...

// 	return dbPool, nil
// }
func init() {

	dbConnect, err := sql.Open("sqlite3", "./data.db")

	if err != nil {
		log.Fatalln(err)
	}

	// err = dbConnect.Ping()
	// if err != nil {
	// 	log.Fatalln(err)
	// }

	db = dbConnect // 用全域變數接

	// db.SetMaxOpenConns(10) // 可設置最大DB連線數，設<=0則無上限（連線分成 in-Use正在執行任務 及 idle執行完成後的閒置 兩種）
	// db.SetMaxIdleConns(10) // 設置最大idle閒置連線數。
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router := gin.Default()
	router.Use(cors.Default())
	//設定大小寫通吃
	router.RedirectFixedPath = true

	router.GET("/multiplayer", multiplayer)
	router.GET("/schedule", schedule)
	router.GET("/ChampionPick", ChampionPick)
	router.GET("/PlayerScore", PlayerScore)
	router.GET("/PlayerScoreAVG", PlayerScoreAVG)
	router.GET("/PlayersAvg", PlayersAvg)
	router.GET("/RoleScore", RoleScore)
	router.GET("/TeamScore", TeamScore)
	router.Run(":8080")
}

type PlayerScoreData struct {
	Team   string
	Player string
	KDA    float64
	EGPM   float64
	DPM    float64
	FBP    float64
	KP     float64
	GD10   float64
	XPD10  float64
	CSD    float64
}

type TeamScoreData struct {
	Role   string
	Team   string
	Player string
	KDA    float64
	EGPM   float64
	DPM    float64
	FBP    float64
	KP     float64
	GD10   float64
	XPD10  float64
	CSD    float64
}

func TeamScore(context *gin.Context) {
	Role := context.Query("Role")
	Team1 := context.Query("Team1")
	Team2 := context.Query("Team2")
	res := []TeamScoreData{}

	if Team1 == "TBD" || Team2 == "TBD" {
		context.JSON(
			http.StatusOK, res)
		return
	}
	Team1 = Team2Long(Team1)
	Team2 = Team2Long(Team2)
	var Roles []string
	var Teams []string
	var Players []string
	var KDAs []float64
	var EGPMs []float64
	var DPMs []float64
	var FBPs []float64
	var KPs []float64
	var GD10s []float64
	var XPD10s []float64
	var CSD10s []float64
	sql := fmt.Sprintf("SELECT role,Team,Player,KDA,EGPM,DPM,FBP,KP,GD10,XPD10,CSD10 FROM PlayerScore WHERE (`Team` = \"%s\" or `Team` = \"%s\") and `role`=\"%s\"", Team1, Team2, Role)
	rows, _ := db.Query(sql)

	for rows.Next() {
		var k string
		var a string
		var b string
		var c float64
		var d float64
		var e float64
		var f float64
		var g float64
		var h float64
		var i float64
		var j float64

		err := rows.Scan(&k, &a, &b, &c, &d, &e, &f, &g, &h, &i, &j)
		if err != nil {
			log.Fatalln(err)
		}

		Roles = append(Roles, k)
		Teams = append(Teams, Team2Short(a))
		Players = append(Players, b)
		KDAs = append(KDAs, c)
		EGPMs = append(EGPMs, d)
		DPMs = append(DPMs, e)
		FBPs = append(FBPs, f)
		KPs = append(KPs, g)
		GD10s = append(GD10s, h)
		XPD10s = append(XPD10s, i)
		CSD10s = append(CSD10s, j)
	}

	for i := 0; i < len(Teams); i = i + 1 {
		temp := TeamScoreData{Roles[i], Teams[i], Players[i], KDAs[i], EGPMs[i], DPMs[i], FBPs[i], KPs[i], GD10s[i], XPD10s[i], CSD10s[i]}
		res = append(res, temp)
	}

	context.JSON(
		http.StatusOK, res)

}

func RoleScore(context *gin.Context) {
	Role := context.Query("Role")
	var Teams []string
	var Players []string
	var KDAs []float64
	var EGPMs []float64
	var DPMs []float64
	var FBPs []float64
	var KPs []float64
	var GD10s []float64
	var XPD10s []float64
	var CSD10s []float64
	sql := fmt.Sprintf("SELECT Team,Player,KDA,EGPM,DPM,FBP,KP,GD10,XPD10,CSD10 FROM PlayerScore WHERE `role` =  \"%s\"  ORDER BY Team;", Role)
	rows, _ := db.Query(sql)

	for rows.Next() {
		var a string
		var b string
		var c float64
		var d float64
		var e float64
		var f float64
		var g float64
		var h float64
		var i float64
		var j float64
		err := rows.Scan(&a, &b, &c, &d, &e, &f, &g, &h, &i, &j)
		if err != nil {
			log.Fatalln(err)
		}

		Teams = append(Teams, Team2Short(a))
		Players = append(Players, b)
		KDAs = append(KDAs, c)
		EGPMs = append(EGPMs, d)
		DPMs = append(DPMs, e)
		FBPs = append(FBPs, f)
		KPs = append(KPs, g)
		GD10s = append(GD10s, h)
		XPD10s = append(XPD10s, i)
		CSD10s = append(CSD10s, j)
	}
	res := []PlayerScoreData{}
	for i := 0; i < len(Teams); i = i + 1 {
		temp := PlayerScoreData{Teams[i], Players[i], KDAs[i], EGPMs[i], DPMs[i], FBPs[i], KPs[i], GD10s[i], XPD10s[i], CSD10s[i]}
		res = append(res, temp)
	}

	context.JSON(
		http.StatusOK, res)

}

type LoLdata struct {
	name  string
	gd10  float32
	xpd10 float32
	csd10 float32
	dpm   float32
	kda   float32
}

func PlayersAvg(context *gin.Context) {
	Role := context.Query("Role")
	var Teams []string
	var Players []string
	var Scores []float64
	sql := fmt.Sprintf("SELECT Team,Player, Score FROM PlayerScore WHERE `Role` = \"%s\"  ORDER BY Score DESC", Role)
	rows, _ := db.Query(sql)
	for rows.Next() {
		var a string
		var b string
		var c float64
		err := rows.Scan(&a, &b, &c)
		if err != nil {
			log.Fatalln(err)
		}
		Teams = append(Teams, Team2Short(a))
		Players = append(Players, b)
		Scores = append(Scores, c)
	}
	context.JSON(
		http.StatusOK,
		gin.H{
			"Teams":   Teams,
			"Players": Players,
			"Scores":  Scores,
		})
}

func Team2Short(name string) string {
	teams := make(map[string]string)
	teams["PSG Talon"] = "PSG"
	teams["Deep Cross Gaming"] = "DCG"
	teams["CTBC Flying Oyster"] = "CFO"
	teams["J Team"] = "JT"
	teams["Frank Esports"] = "FAK"
	teams["Beyond Gaming"] = "BYG"
	teams["Impunity"] = "IMP"
	teams["SEM9"] = "S9"
	teams["Meta Falcon Team"] = "MFT"
	teams["Impunity"] = "IMP"
	teams["Dewish Team"] = "DWT"
	return teams[name]
}

func Team2Long(name string) string {
	teams := make(map[string]string)
	teams["PSG"] = "PSG Talon"
	teams["DCG"] = "Deep Cross Gaming"
	teams["CFO"] = "CTBC Flying Oyster"
	teams["JT"] = "J Team"
	teams["FAK"] = "Frank Esports"
	teams["BYG"] = "Beyond Gaming"
	teams["IMP"] = "Impunity"
	teams["S9"] = "SEM9"
	teams["MFT"] = "Meta Falcon Team"
	teams["IMP"] = "Impunity"
	teams["DWT"] = "Dewish Team"
	return teams[name]
}

func PlayerScoreAVG(context *gin.Context) {
	Role := context.Query("Role")
	Player := context.Query("Player")

	var (
		temp    string
		KDA_U   float64
		KDA_L   float64
		EGPM_U  float64
		EGPM_L  float64
		DPM_U   float64
		DPM_L   float64
		FBP_U   float64
		FBP_L   float64
		KP_U    float64
		KP_L    float64
		GD10_U  float64
		GD10_L  float64
		CSD10_U float64
		CSD10_L float64
		XPD10_U float64
		XPD10_L float64
	)
	var (
		KDA   float64
		EGPM  float64
		DPM   float64
		FBP   float64
		KP    float64
		GD10  float64
		CSD10 float64
		XPD10 float64
	)
	sql := fmt.Sprintf("select * from RoleDataMaxMin Where `Role` = %s", Role)
	rows, _ := db.Query(sql)
	for rows.Next() {
		err := rows.Scan(&temp, &KDA_U, &KDA_L, &EGPM_U, &EGPM_L, &DPM_U, &DPM_L, &FBP_U, &FBP_L, &KP_U, &KP_L, &GD10_U, &GD10_L, &CSD10_U, &CSD10_L, &XPD10_U, &XPD10_L)
		if err != nil {
			log.Fatalln(err)
		}
	}
	sql = fmt.Sprintf("select KDA,EGPM,DPM,FBP,KP,GD10,XPD10,CSD10 from RoleDataAVG where `player` = %s", Player)
	rows, _ = db.Query(sql)
	for rows.Next() {
		err := rows.Scan(&KDA, &EGPM, &DPM, &FBP, &KP, &GD10, &XPD10, &CSD10)
		if err != nil {
			log.Fatalln(err)
		}
	}

	var (
		KDAscore   float64
		EGPMscore  float64
		DPMscore   float64
		FBPscore   float64
		KPscore    float64
		GD10score  float64
		CSD10score float64
		XPD10score float64
	)
	KDAscore = MinMaxNorm(KDA, KDA_L, KDA_U)
	EGPMscore = MinMaxNorm(EGPM, EGPM_L, EGPM_U)
	DPMscore = MinMaxNorm(DPM, DPM_L, DPM_U)
	FBPscore = MinMaxNorm(FBP, FBP_L, FBP_U)
	KPscore = MinMaxNorm(KP, KP_L, KP_U)
	GD10score = MinMaxNorm(GD10, GD10_L, GD10_U)
	CSD10score = MinMaxNorm(CSD10, CSD10_L, CSD10_U)
	XPD10score = MinMaxNorm(XPD10, XPD10_L, XPD10_U)

	avgScore := (KDAscore + EGPMscore + DPMscore + FBPscore + KPscore + GD10score + CSD10score + XPD10score) / 10

	res_str := strconv.FormatFloat(avgScore, 'f', 2, 64)
	res, _ := strconv.ParseFloat(res_str, 64)

	context.JSON(
		http.StatusOK,
		gin.H{
			"AvgScore": res,
		})
}

func PlayerScore(context *gin.Context) {
	Role := context.Query("Role")
	Player := context.Query("Player")

	var (
		temp    string
		KDA_U   float64
		KDA_L   float64
		EGPM_U  float64
		EGPM_L  float64
		DPM_U   float64
		DPM_L   float64
		FBP_U   float64
		FBP_L   float64
		KP_U    float64
		KP_L    float64
		GD10_U  float64
		GD10_L  float64
		CSD10_U float64
		CSD10_L float64
		XPD10_U float64
		XPD10_L float64
	)
	var (
		KDA   float64
		EGPM  float64
		DPM   float64
		FBP   float64
		KP    float64
		GD10  float64
		CSD10 float64
		XPD10 float64
	)
	sql := fmt.Sprintf("select * from RoleDataMaxMin Where `Role` = \"%s\"", Role)
	rows, _ := db.Query(sql)
	for rows.Next() {
		err := rows.Scan(&temp, &KDA_U, &KDA_L, &EGPM_U, &EGPM_L, &DPM_U, &DPM_L, &FBP_U, &FBP_L, &KP_U, &KP_L, &GD10_U, &GD10_L, &CSD10_U, &CSD10_L, &XPD10_U, &XPD10_L)
		if err != nil {
			log.Fatalln(err)
		}
	}
	sql = fmt.Sprintf("select KDA,EGPM,DPM,FBP,KP,GD10,XPD10,CSD10 from RoleDataAVG where `player` = \"%s\" and `Role` = \"%s\"", Player, Role)
	rows, _ = db.Query(sql)
	for rows.Next() {
		err := rows.Scan(&KDA, &EGPM, &DPM, &FBP, &KP, &GD10, &XPD10, &CSD10)
		if err != nil {
			log.Fatalln(err)
		}
	}

	var (
		KDAscore   float64
		EGPMscore  float64
		DPMscore   float64
		FBPscore   float64
		KPscore    float64
		GD10score  float64
		CSD10score float64
		XPD10score float64
	)
	KDAscore = MinMaxNorm(KDA, KDA_L, KDA_U)
	EGPMscore = MinMaxNorm(EGPM, EGPM_L, EGPM_U)
	DPMscore = MinMaxNorm(DPM, DPM_L, DPM_U)
	FBPscore = MinMaxNorm(FBP, FBP_L, FBP_U)
	KPscore = MinMaxNorm(KP, KP_L, KP_U)
	GD10score = MinMaxNorm(GD10, GD10_L, GD10_U)
	CSD10score = MinMaxNorm(CSD10, CSD10_L, CSD10_U)
	XPD10score = MinMaxNorm(XPD10, XPD10_L, XPD10_U)

	context.JSON(
		http.StatusOK,
		gin.H{
			"KDAscore":   KDAscore,
			"EGPMscore":  EGPMscore,
			"DPMscore":   DPMscore,
			"FBPscore":   FBPscore,
			"KPscore":    KPscore,
			"GD10score":  GD10score,
			"CSD10score": CSD10score,
			"XPD10score": XPD10score,
		})
}

func ChampionPick(context *gin.Context) {
	var Champions []string
	var Times []int
	var Role []string
	sql := "select * from ChampionPick"
	rows, _ := db.Query(sql)
	for rows.Next() {
		var a int
		var b string
		var c string
		var d int
		err := rows.Scan(&a, &b, &c, &d)
		if err != nil {
			log.Fatalln(err)
		}
		Champions = append(Champions, c)
		Times = append(Times, d)
		Role = append(Role, b)
	}

	context.JSON(
		http.StatusOK,
		gin.H{
			"Champions": Champions,
			"Times":     Times,
			"Role":      Role,
		})
}

func schedule(context *gin.Context) {
	var Date []string
	var Weekend []string
	var Team1 []string
	var Team2 []string
	var T1Win []int
	var T2Win []int
	sql := "SELECT `Date`,`Weekend`,`Team1`,`Team2`,`T1Win`,`T2Win` FROM Schedule"
	rows, _ := db.Query(sql)
	for rows.Next() {
		var a string
		var b string
		var c string
		var d string
		var e int
		var f int
		err := rows.Scan(&a, &b, &c, &d, &e, &f)
		if err != nil {
			log.Fatalln(err)
		}

		Date = append(Date, a)
		Weekend = append(Weekend, b)
		Team1 = append(Team1, c)
		Team2 = append(Team2, d)

		T1Win = append(T1Win, e)
		T2Win = append(T2Win, f)

	}
	context.JSON(
		http.StatusOK,
		gin.H{
			"DateTime": Date,
			"Weekend":  Weekend,
			"Team1":    Team1,
			"Team2":    Team2,
			"T1Win":    T1Win,
			"T2Win":    T2Win,
		})

}

func multiplayer(context *gin.Context) {
	player1 := context.Query("player1")
	player2 := context.Query("player2")
	Player := []string{player1, player2}
	var GD10 []float32
	var XPD10 []float32
	var CSD10 []float32
	var DPM []float32
	var KDA []float32
	sql := "SELECT `player`, AVG(`GD10`) AS GD10, AVG(`XPD10`) AS XPD10, AVG(`CSD10`) AS CSD10, AVG(`DPM`) AS DPM, AVG(`KDA`) AS KDA FROM `pcs_summer_2022` WHERE "

	for idx, element := range Player {
		temp := fmt.Sprintf("Player = \"%s\"", element)
		if idx < len(Player)-1 {
			sql += temp + " Or "
		} else {
			sql += temp
		}
	}
	sql += " GROUP BY `player`"
	rows, _ := db.Query(sql)

	for rows.Next() {
		var temp LoLdata
		err := rows.Scan(&temp.name, &temp.gd10, &temp.xpd10, &temp.csd10, &temp.dpm, &temp.kda)
		if err != nil {
			log.Fatalln(err)
		}
		log.Printf("%s", temp.name)

		GD10 = append(GD10, temp.gd10)
		XPD10 = append(XPD10, temp.xpd10)
		CSD10 = append(CSD10, temp.csd10)
		DPM = append(DPM, temp.dpm)
		KDA = append(KDA, temp.kda)
	}

	context.JSON(
		http.StatusOK,
		gin.H{
			"Name":  Player,
			"GD10":  GD10,
			"XPD10": XPD10,
			"CSD10": CSD10,
			"DPM":   DPM,
			"KDA":   KDA,
		})

	// sql := fmt.Sprintf("SELECT `Player`,`GD10`,`XPD10`,`CSD10`,`DPM`,`KDA`,`KP` FROM `pcs_summer_2022` WHERE `Player` = \"%s\" ", search)

}
func MinMaxNorm(_x, _min, _max float64) float64 {
	res_raw := (_x - _min) / (_max - _min)
	res_str := strconv.FormatFloat(res_raw, 'f', 2, 64)
	res, _ := strconv.ParseFloat(res_str, 64)
	return res * 10
}

func maxArray(arr []float32) float32 {
	var maxRes float32 = -999
	for _, element := range arr {
		if element > maxRes {
			maxRes = element
		}
	}
	return maxRes
}

func minArray(arr []float32) float32 {
	var minRes float32 = 999
	for _, element := range arr {
		if element < minRes {
			minRes = element
		}
	}
	return minRes
}
func minmaxArray(arr []float32) (float32, float32) {
	var minRes float32 = 999
	var maxRes float32 = -999
	for _, element := range arr {
		if element > maxRes {
			maxRes = element
		}
		if element < minRes {
			minRes = element
		}
	}
	return maxRes, minRes
}
