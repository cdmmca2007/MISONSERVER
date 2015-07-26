/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dlabs.util;

/**
 *
 * @author cd
 */
public class JsonPostResult {
        boolean success;
    int errorCode;
    String message;
    Object model;

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getModel() {
        return model;
    }

    public void setModel(Object model) {
        this.model = model;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

}
