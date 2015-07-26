/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.mis.aspect;
import java.util.logging.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

/**
 *
 * @author Kamlesh
 */
@Aspect
public class LoggingAspect {

    @Before("execution(* com.dlabs.mis..*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        Logger.getLogger(joinPoint.getTarget().getClass().getName()).info("Start: "+joinPoint.getSignature().getName());
    }

    @After("execution(* com.dlabs.mis..*.*(..))")
    public void logAfter(JoinPoint joinPoint) {
        Logger.getLogger(joinPoint.getTarget().getClass().getName()).info("Finish: " + joinPoint.getSignature().getName());
    }

   @AfterThrowing(
      pointcut = "execution(* com.dlabs.mis..*.*(..))",
      throwing= "error")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable error) {
	Logger.getLogger(joinPoint.getTarget().getClass().getName()).info("logAfterThrowing : " + joinPoint.getSignature().getName());
	Logger.getLogger(joinPoint.getTarget().getClass().getName()).info("Exception : " + error.getMessage());
    }
}
