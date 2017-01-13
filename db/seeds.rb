# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

role_admin = Role.create(name: "Admin")
role_student = Role.create(name: "Estudiante")

# Countries
peru = Country.create(name: "Perú")

# Departments
amazonas = peru.departments.create(name: "Amazonas")
anchas = peru.departments.create(name: "Áncash")
apurimac = peru.departments.create(name: "Apurímac")
arequipa = peru.departments.create(name: "Arequipa")
ayacucho = peru.departments.create(name: "Ayacucho")
cajamarca = peru.departments.create(name: "Cajamarca")
callao = peru.departments.create(name: "Callao")
cusco = peru.departments.create(name: "Cusco")
huancavelica = peru.departments.create(name: "Huancavelica")
huanuco = peru.departments.create(name: "Huánuco")
ica = peru.departments.create(name: "Ica")
junin = peru.departments.create(name: "Junín")
lalibertad = peru.departments.create(name: "La Libertad")
lambayeque = peru.departments.create(name: "Lambayeque")
lima = peru.departments.create(name: "Lima")
loreto = peru.departments.create(name: "Loreto")
madrededios = peru.departments.create(name: "Madre de Dios")
moquegua = peru.departments.create(name: "Moquegua")
pasco = peru.departments.create(name: "Pasco")
piura = peru.departments.create(name: "Piura")
puno = peru.departments.create(name: "Puno")
sanmartin = peru.departments.create(name: "San Martín")
tacna = peru.departments.create(name: "Tacna")
tumbes = peru.departments.create(name: "Tumbes")
ucayali = peru.departments.create(name: "Ucayali")


# Provinces
amazonas.provinces.create(name: "Chachapoyas")
amazonas.provinces.create(name: "Bagua")
amazonas.provinces.create(name: "Bongará")
amazonas.provinces.create(name: "Luya")
amazonas.provinces.create(name: "Rodríguez de Mendoza")
amazonas.provinces.create(name: "Utcubamba")

anchas.provinces.create(name: "Huaraz")
anchas.provinces.create(name: "Aija")
anchas.provinces.create(name: "Antonio Raymondi")
anchas.provinces.create(name: "Asunción")
anchas.provinces.create(name: "Bolognesi")
anchas.provinces.create(name: "Carhuaz")
anchas.provinces.create(name: "Carlos Fermín Fitzcarrald")
anchas.provinces.create(name: "Casma")
anchas.provinces.create(name: "Corongo")
anchas.provinces.create(name: "Huari")
anchas.provinces.create(name: "Huarmey")
anchas.provinces.create(name: "Huaylas")
anchas.provinces.create(name: "Mariscal Luzuriaga")
anchas.provinces.create(name: "Ocros")
anchas.provinces.create(name: "Pallasca")
anchas.provinces.create(name: "Pomabamba")
anchas.provinces.create(name: "Recuay")
anchas.provinces.create(name: "Santa")
anchas.provinces.create(name: "Sihuas")
anchas.provinces.create(name: "Yungay")

apurimac.provinces.create(name: "Abancay")
apurimac.provinces.create(name: "Andahuaylas")
apurimac.provinces.create(name: "Antabamba")
apurimac.provinces.create(name: "Aymaraes")
apurimac.provinces.create(name: "Cotabambas")
apurimac.provinces.create(name: "Chincheros")
apurimac.provinces.create(name: "Grau")

arequipa.provinces.create(name: "Arequipa")
arequipa.provinces.create(name: "Camaná")
arequipa.provinces.create(name: "Caravelí")
arequipa.provinces.create(name: "Castilla")
arequipa.provinces.create(name: "Caylloma")
arequipa.provinces.create(name: "Condesuyos")
arequipa.provinces.create(name: "Islay")
arequipa.provinces.create(name: "La Uniòn")

ayacucho.provinces.create(name: "Huamanga")
ayacucho.provinces.create(name: "Cangallo")
ayacucho.provinces.create(name: "Huanca Sancos")
ayacucho.provinces.create(name: "Huanta")
ayacucho.provinces.create(name: "La Mar")
ayacucho.provinces.create(name: "Lucanas")
ayacucho.provinces.create(name: "Parinacochas")
ayacucho.provinces.create(name: "Pàucar del Sara Sara")
ayacucho.provinces.create(name: "Sucre")
ayacucho.provinces.create(name: "Víctor Fajardo")
ayacucho.provinces.create(name: "Vilcas Huamán")

cajamarca.provinces.create(name: "Cajamarca")
cajamarca.provinces.create(name: "Cajabamba")
cajamarca.provinces.create(name: "Celendín")
cajamarca.provinces.create(name: "Chota")
cajamarca.provinces.create(name: "Contumazá")
cajamarca.provinces.create(name: "Cutervo")
cajamarca.provinces.create(name: "Hualgayoc")
cajamarca.provinces.create(name: "Jaén")
cajamarca.provinces.create(name: "San Ignacio")
cajamarca.provinces.create(name: "San Marcos")
cajamarca.provinces.create(name: "San Miguel")
cajamarca.provinces.create(name: "San Pablo")
cajamarca.provinces.create(name: "Santa Cruz")

callao.provinces.create(name: "Prov. Const. del Callao")

cusco.provinces.create(name: "Cusco")
cusco.provinces.create(name: "Acomayo")
cusco.provinces.create(name: "Anta")
cusco.provinces.create(name: "Calca")
cusco.provinces.create(name: "Canas")
cusco.provinces.create(name: "Canchis")
cusco.provinces.create(name: "Chumbivilcas")
cusco.provinces.create(name: "Espinar")
cusco.provinces.create(name: "La Convención")
cusco.provinces.create(name: "Paruro")
cusco.provinces.create(name: "Paucartambo")
cusco.provinces.create(name: "Quispicanchi")
cusco.provinces.create(name: "Urubamba")

huancavelica.provinces.create(name: "Huancavelica")
huancavelica.provinces.create(name: "Acobamba")
huancavelica.provinces.create(name: "Angaraes")
huancavelica.provinces.create(name: "Castrovirreyna")
huancavelica.provinces.create(name: "Churcampa")
huancavelica.provinces.create(name: "Huaytará")
huancavelica.provinces.create(name: "Tayacaja")

huanuco.provinces.create(name: "Huánuco")
huanuco.provinces.create(name: "Ambo")
huanuco.provinces.create(name: "Dos de Mayo")
huanuco.provinces.create(name: "Huacaybamba")
huanuco.provinces.create(name: "Huamalíes")
huanuco.provinces.create(name: "Leoncio Prado")
huanuco.provinces.create(name: "Marañón")
huanuco.provinces.create(name: "Pachitea")
huanuco.provinces.create(name: "Puerto Inca")
huanuco.provinces.create(name: "Lauricocha")
huanuco.provinces.create(name: "Yarowilca")

province_ica = ica.provinces.create(name: "Ica")
ica.provinces.create(name: "Chincha")
ica.provinces.create(name: "Nazca")
ica.provinces.create(name: "Palpa")
ica.provinces.create(name: "Pisco")

junin.provinces.create(name: "Huancayo")
junin.provinces.create(name: "Concepción")
junin.provinces.create(name: "Chanchamayo")
junin.provinces.create(name: "Jauja")
junin.provinces.create(name: "Junín")
junin.provinces.create(name: "Satipo")
junin.provinces.create(name: "Tarma")
junin.provinces.create(name: "Yauli")
junin.provinces.create(name: "Chupaca")

lalibertad.provinces.create(name: "Trujillo")
lalibertad.provinces.create(name: "Ascope")
lalibertad.provinces.create(name: "Bolívar")
lalibertad.provinces.create(name: "Chepén")
lalibertad.provinces.create(name: "Julcán")
lalibertad.provinces.create(name: "Otuzco")
lalibertad.provinces.create(name: "Pacasmayo")
lalibertad.provinces.create(name: "Pataz")
lalibertad.provinces.create(name: "Sánchez Carrión")
lalibertad.provinces.create(name: "Santiago de Chuco")
lalibertad.provinces.create(name: "Gran Chimú")
lalibertad.provinces.create(name: "Virú")

lambayeque.provinces.create(name: "Chiclayo")
lambayeque.provinces.create(name: "Ferreñafe")
lambayeque.provinces.create(name: "Lambayeque")

lima.provinces.create(name: "Lima")
lima.provinces.create(name: "Barranca")
lima.provinces.create(name: "Cajatambo")
lima.provinces.create(name: "Canta")
lima.provinces.create(name: "Cañete")
lima.provinces.create(name: "Huaral")
lima.provinces.create(name: "Huarochirí")
lima.provinces.create(name: "Huaura")
lima.provinces.create(name: "Oyón")
lima.provinces.create(name: "Yauyos")

loreto.provinces.create(name: "Maynas")
loreto.provinces.create(name: "Alto Amazonas")
loreto.provinces.create(name: "Loreto")
loreto.provinces.create(name: "Mariscal Ramón Castilla")
loreto.provinces.create(name: "Requena")
loreto.provinces.create(name: "Ucayali")
loreto.provinces.create(name: "Datem del Marañón")
loreto.provinces.create(name: "Putumayo")

madrededios.provinces.create(name: "Tambopata")
madrededios.provinces.create(name: "Manu")
madrededios.provinces.create(name: "Tahuamanu")

moquegua.provinces.create(name: "Mariscal Nieto")
moquegua.provinces.create(name: "General Sánchez Cerro")
moquegua.provinces.create(name: "Ilo")

pasco.provinces.create(name: "Pasco")
pasco.provinces.create(name: "Daniel Alcides Carrión")
pasco.provinces.create(name: "Oxapampa")

piura.provinces.create(name: "Piura")
piura.provinces.create(name: "Ayabaca")
piura.provinces.create(name: "Huancabamba")
piura.provinces.create(name: "Morropón")
piura.provinces.create(name: "Paita")
piura.provinces.create(name: "Sullana")
piura.provinces.create(name: "Talara")
piura.provinces.create(name: "Sechura")

puno.provinces.create(name: "Puno")
puno.provinces.create(name: "Azángaro")
puno.provinces.create(name: "Carabaya")
puno.provinces.create(name: "El Collao")
puno.provinces.create(name: "Huancané")
puno.provinces.create(name: "Lampa")
puno.provinces.create(name: "Melgar")
puno.provinces.create(name: "Moho")
puno.provinces.create(name: "San Antonio de Putina")
puno.provinces.create(name: "San Román")
puno.provinces.create(name: "Sandia")
puno.provinces.create(name: "Yunguyo")

sanmartin.provinces.create(name: "Moyobamba")
sanmartin.provinces.create(name: "Bellavista")
sanmartin.provinces.create(name: "El Dorado")
sanmartin.provinces.create(name: "Huallaga")
sanmartin.provinces.create(name: "Lamas")
sanmartin.provinces.create(name: "Mariscal Cáceres")
sanmartin.provinces.create(name: "Picota")
sanmartin.provinces.create(name: "Rioja")
sanmartin.provinces.create(name: "San Martín")
sanmartin.provinces.create(name: "Tocache")

tacna.provinces.create(name: "Tacna")
tacna.provinces.create(name: "Candarave")
tacna.provinces.create(name: "Jorge Basadre")
tacna.provinces.create(name: "Tarata")

tumbes.provinces.create(name: "Tumbes")
tumbes.provinces.create(name: "Contralmirante Villar")
tumbes.provinces.create(name: "Zarumilla")

ucayali.provinces.create(name: "Coronel Portillo")
ucayali.provinces.create(name: "Atalaya")
ucayali.provinces.create(name: "Padre Abad")
ucayali.provinces.create(name: "Purús")

User.create(nickname: "lcontreras", password: "A3eilm2s2u!", role: role_admin, province: province_ica, email: "lidercontreras22@gmail.com", dni: "12345678")
User.create(nickname: "brodriguez", password: "A3eilm2s2u!", role: role_student, province: province_ica, email: "brodriguez@gmail.com", dni: "12345679")

Category.create(name: "Marketing & Negocios", slug: "marketing")
Category.create(name: "Diseño & Programación", slug: "diseno")
Category.create(name: "Idiomas & Des. Personal", slug: "idiomas")