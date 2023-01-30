package com.ebrahim.salehi.vw.tintschl.websocketebrahim;

public class MessageModel {
    private String message;
    private String fromLogin;

    public MessageModel(String message, String fromLogin) {
        this.message = message;
        this.fromLogin = fromLogin;
    }

    @Override
    public String toString() {
        return "MessageModel [message=" + message + ", fromLogin=" + fromLogin + "]";
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getFromLogin() {
        return fromLogin;
    }
    public void setFromLogin(String fromLogin) {
        this.fromLogin = fromLogin;
    }
    
}
