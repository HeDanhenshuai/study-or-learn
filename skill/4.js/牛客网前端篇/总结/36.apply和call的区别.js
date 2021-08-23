//例一
function add(c, d) {
      return this.a + this.b + c + d;
}
var s = { a: 1, b: 2 };
console.log(add.call(s, [3, 4])); // 33 原因：1+2+[3,4]+undifined=3+[3,4]+undifined=33

console.log(add.call(s, 3, 4)); // 1+2+3+4 = 10
console.log(add.apply(s, [5, 6])); // 1+2+5+6 = 14

//例二
window.firstName = "Cynthia";
window.lastName = "_xie";
var myObject = {firstName:'my', lastName:'Object'};
function getName(){
   console.log(this.firstName + this.lastName);
}
function getMessage(sex,age){
   console.log(this.firstName + this.lastName + " 性别: " + sex + " age: " + age );
}
getName.call(window); // Cynthia_xie
getName.call(myObject); // myObject
getName.apply(window); // Cynthia_xie
getName.apply(myObject);// myObject
getMessage.call(window,"女",21); //Cynthia_xie 性别: 女 age: 21
getMessage.apply(window,["女",21]); // Cynthia_xie 性别: 女 age: 21
getMessage.call(myObject,"未知",22); //myObject 性别: 未知 age: 22
getMessage.apply(myObject,["未知",22]); // myObject 性别: 未知 age: 22



