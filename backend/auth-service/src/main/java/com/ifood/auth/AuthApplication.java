package com.ifood.auth;

import com.ifood.core.property.JwtConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableEurekaClient
@EnableConfigurationProperties(value = JwtConfiguration.class)
@EntityScan({"com.ifood.core.entity"})
@EnableMongoRepositories({"com.ifood.core.repository"})
public class AuthApplication {

    public static void main (String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }

}
