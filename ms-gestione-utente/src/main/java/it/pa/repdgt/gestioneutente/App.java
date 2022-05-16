package it.pa.repdgt.gestioneutente;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@EnableCaching
@EnableAspectJAutoProxy
@EntityScan(basePackages = {"it.pa.repdgt.shared.entity"})
@Slf4j
public class App implements CommandLineRunner {
	
	public static void main(String[] args) {
		/*ConfigurableApplicationContext springBootApp =*/ SpringApplication.run(App.class, args);
		log.info("***** APPLICATION START *****");
	}
	
	@Override
	public void run(String... args) throws Exception {
	}
}