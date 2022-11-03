package ma.showmaker.pollingbackend.model;

import javax.persistence.*;

@Entity
@Table(name = "choices")
public class Choice {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String answer;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "poll_id", nullable = true)
    private Poll poll;

    public Choice(String answer) {
        this.answer = answer;
    }

    public Choice() {

    }

    public Poll getPoll() {
        return poll;
    }

    public void setPoll(Poll poll) {
        this.poll = poll;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
