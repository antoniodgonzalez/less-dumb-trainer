#include <Servo.h> 
 
Servo servo;
 
void setup() { 
    servo.attach(9);
    servo.write(0);
    Serial.begin(115200);
    pinMode(11, OUTPUT);
} 
 
void loop() { 
    if (Serial.available()) {        
        byte value = Serial.read();
        analogWrite(11, value);
        servo.write(value);   
        Serial.write(value);     
    }
} 
