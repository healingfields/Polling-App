package ma.showmaker.pollingbackend.payload;

public class JwtAuthenticationResponse {

    private String accessToken;
    private String type="bearer";

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
