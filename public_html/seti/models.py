from seti import db

class routers(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	latitude = db.Column(db.Float)
	longitude = db.Column(db.Float)
	model = db.Column(db.Text)
	connect_id = db.Column(db.Integer)
	on_off = db.Column(db.Integer)
	Type =  db.Column(db.Text)
	inf_count = db.Column(db.Integer)
	smotr = db.Column(db.Text)
	type_of_cabel = db.Column(db.Text)
	type_of_connection = db.Column(db.Text)
	
	def __init__(self, latitude, longitude, model, connect_id, on_off, Type, inf_count, smotr, type_of_cabel, type_of_connection): #type_of_cabel
		self.latitude = latitude
		self.longitude = longitude
		self.model = model
		self.connect_id = connect_id
		self.on_off = on_off
		self.Type = Type
		self.inf_count = inf_count
		self.smotr = smotr
		self.type_of_cabel = type_of_cabel
		self.type_of_connection = type_of_connection
	def __repr__(self):
		router_dict = {"id" : self.id, "lat" : self.latitude, "lng" : self.longitude, "model" : self.model, 
		"connect_id" : self.connect_id, 
		"on_off" : self.on_off, "Type" : self.Type, "inf_count" : self.inf_count, 'smotr' : self.smotr, 
			"type_of_cabel" : self.type_of_cabel, 'type_of_connection' : self.type_of_connection
		}
		return str(router_dict)

class home_routers(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	model = db.Column(db.Text)
	connect_id = db.Column(db.Integer)
	on_off = db.Column(db.Integer)
	Type =  db.Column(db.Text)
	inf_count = db.Column(db.Integer)
	type_of_cabel = db.Column(db.Text)
	type_of_connection = db.Column(db.Text)
	def __init__(self, model, connect_id, on_off, Type, inf_count):
		self.model = model
		self.connect_id = connect_id
		self.on_off = on_off
		self.Type = Type
		self.inf_count = inf_count
		self.type_of_cabel = type_of_cabel
		self.type_of_connection = type_of_connection
	def __repr__(self):
		home_router_dict = {"id" : self.id,"model" : self.model, "connect_id" : self.connect_id, 
		"on_off" : self.on_off, "Type" : self.Type, "inf_count" : self.inf_count,
			"type_of_cabel" : self.type_of_cabel, 'type_of_connection' : self.type_of_connection
		}
		return str(home_router_dict)
