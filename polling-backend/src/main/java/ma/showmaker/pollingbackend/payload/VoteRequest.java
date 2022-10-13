package ma.showmaker.pollingbackend.payload;

public class VoteRequest {

    private long choiceId;

    public long getChoiceId() {
        return choiceId;
    }

    public void setChoiceId(long choiceId) {
        this.choiceId = choiceId;
    }
}
