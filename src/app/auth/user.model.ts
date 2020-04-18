export class User {

  nombre: string;
  email: string;
  uid: string;

  constructor(obj: DataObj) {
    this.nombre = obj && obj.nombre || null //si existe el obj entonces toma el obj.nombre si no null
    this.email = obj && obj.email || null
    this.uid = obj && obj.uid || null

  }
}


interface DataObj {
  uid: string,
  nombre: string,
  email: string
}
