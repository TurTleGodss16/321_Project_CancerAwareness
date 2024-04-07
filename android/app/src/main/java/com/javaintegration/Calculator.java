package com.javaintegration;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class Calculator  extends ReactContextBaseJavaModule{
    public Calculator(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName(){
        return "Calculator";
    }

    public int calc(int a, int b){
        return a+b;
    }
}
