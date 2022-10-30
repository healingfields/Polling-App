package ma.showmaker.pollingbackend.payload;

public class UserIdentity {

    private boolean isAvailable;

    public UserIdentity(boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
