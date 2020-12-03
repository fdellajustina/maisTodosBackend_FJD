import sqlite3
import os

class Database():

	def __init__(self, DATABASE_PATHNAME):
		self.databasePathName = DATABASE_PATHNAME

	def conectDatabase(self):

		con = sqlite3.connect(self.databasePathName)

		return con

	def insetData(self, dataSet_list):
		con = self.conectDatabase()
		cur = con.cursor()

		sql_insert = "INSERT INTO creditCards VALUES (?, ?, ?, ?, ?)"
		
		for data in dataSet_list:
			cur.execute(sql_insert, data)

		con.commit()
		con.close()

	def createTable(self):
		os.remove(self.databasePathName) if os.path.exists(self.databasePathName) else None

		con = self.conectDatabase()
		cur = con.cursor()
		sql_create = 'CREATE TABLE creditCards (id INTEGER PRIMARY KEY NOT NULL, exp_date DATETIME, holder varchar(150), number INTEGER, cvv INTEGER)'
		cur.execute(sql_create)
		con.close()

	def createInsertDATABASE(self):
		
		self.createTable()
		recset	= [
			(None, '02/2028', 'João Pedro', 1000000000000001, 123),
			(None, '09/2029', 'Ana Ribeiro', 2000000000000002, 123),
			(None, '04/2027', 'Carla Sanches', 3000000000000003, 123),
			(None, '06/2025', 'Marina Oliveira', 4000000000000004, 123),
		]
		self.insetData(recset)
