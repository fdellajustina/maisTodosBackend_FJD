import sqlite3
import os

#############################
from flask import Flask, render_template, g, request, redirect

app = Flask(__name__)
##############################

DATABASE = './database/teste.db'

from database import Database

database_obj = Database(DATABASE)

@app.route('/', methods=['GET'])
def home():
	database_obj.createInsertDATABASE()
	return render_template('index.html')

@app.route('/credit_cards', methods=['POST', 'GET'])
def get_credt_card():
	con = database_obj.conectDatabase()
	cur = con.cursor()
	cur.execute('SELECT * FROM creditCards')
	dados = cur.fetchall()
	cur.close()

	return render_template('credit_cards.html', dados=dados)

@app.route('/cadastrar-cartao', methods=['POST', 'GET'])
def new_credt_card():

	if request.method == 'POST':
		exp_date = request.form['exp_date']
		holder = request.form['holder']
		number = request.form['number']
		cvv = request.form['cvv']

		con = database_obj.conectDatabase()
		con.row_factory = sqlite3.Row
		cur = con.cursor()
		database_obj.insetData([(None, exp_date, holder, number, cvv)])
		
		cur.execute('SELECT * FROM creditCards')
		dados = cur.fetchall()

		con.commit()
		cur.close()

		return render_template('credit_cards.html', dados=dados)

	return render_template('new_credit_card.html')

@app.route('/cardDetail/<rowData>', methods=['GET'])
def cardDetail(rowData):
	con = database_obj.conectDatabase()
	cur = con.cursor()
	cur.execute('SELECT * FROM creditCards WHERE id=?',(rowData,))
	dados = cur.fetchall()
	cur.close()

	return render_template('cardDetail.html', dados=dados)

if __name__=="__main__":
    app.run(host=os.getenv('IP', '0.0.0.0'), port=8050)