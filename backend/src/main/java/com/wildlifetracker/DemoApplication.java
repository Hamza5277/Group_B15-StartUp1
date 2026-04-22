package com.wildlifetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// this is the main entry point for the entire spring boot applicaton
// without this class nothing would start, its basically the ignition key
@SpringBootApplication // this annotatoin tells spring to scan all the packages and set everything up automaticly
public class DemoApplication {

    // java always needs a main method to know where to begin running
    // SpringApplication.run starts up the whole web server and loads all the beans
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
