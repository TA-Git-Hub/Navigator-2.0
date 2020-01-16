// Rules of Coding
//CLASS
// declaring a class -> name starts with an uppercase letter, camelCase is used for the rest
//            (all words are put together with first letter of each word being uppercase).
// every class contains 5 parts:
//            1) all property variables are declared;
//            2) constructor(s);
//            3) "CALCULATIONS" section, all functional functions are included there;
//            4) getters and setters functions, getters are first, after last getter ends, first setter begins;
//            5) other functions, particularly temporary functions (i.e. testing purposes).
//VARIABLES
// declaring a variable -> name starts with a letter, standard camelCase is used for the rest
//            (all words are put together with first letter of each word being uppercase, except for first word).
// variable data type is declared immediately (where possible).
//FUNCTIONS
// declaring a function -> name starts with an uppercase letter, camelCase is used for the rest
//            (all words are put together with first letter of each word being uppercase).
// each function is declared with either "public" or "private" keyword.


/**
  * [@About]      - this is an example class
  * [@Functions]  - ExampleClass() -constructor : line 33
                  - ExampleFunction()           : line 38
                  - non-interesting getters & setters
**/
class ExampleClass{
  private var propertyVariable : String = "String variable.";
  private var typeArray : String[] = [];

  //constructor
  public function ExampleClass(input){
    this.propertyVariable = input.variable;
  }

  //CALCULATIONS
  public function ExampleFunction(name, surname){
    var outputString : String = null;
    outputString = name + " " + surname;
    return outputString;
  }

  //GETTERS
  public function GetPropertyVariable(){
    return this.propertyVariable;
  }

  //SETTERS
  public function SetPropertyVariable(input){
    this.propertyVariable = input;
  }

  public function TypeArrayHandlingExample(listOfNames){
    this.typeArray = new String[listOfNames.length];  //This is how Array needs to be declared.
    for(var i = 0; i < listOfNames.length; i++){      //You need to have length when declaring.
      this.typeArray[i] = listOfNames[i];
    }
  }
}
