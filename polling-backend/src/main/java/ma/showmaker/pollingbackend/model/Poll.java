package ma.showmaker.pollingbackend.model;

import ma.showmaker.pollingbackend.model.utils.DateProp;
import ma.showmaker.pollingbackend.model.utils.UserDateAudit;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "polls")
public class Poll extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String question;

    @OneToMany(mappedBy = "poll",
                cascade = CascadeType.ALL,
                fetch = FetchType.EAGER,
                orphanRemoval = true
    )
    @Fetch(FetchMode.SELECT)
    private List<Choice> choices = new ArrayList<>();

    private Instant expirationDateTime;

    public Instant getExpirationDateTime() {
        return expirationDateTime;
    }

    public void setExpirationDateTime(Instant expirationDateTime) {
        this.expirationDateTime = expirationDateTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }

    public void addChoice(Choice choice){
        choices.add(choice);
        choice.setPoll(this);
    }
    public void removeChoice(Choice choice){
        choices.remove(choice);
        choice.setPoll(null);
    }

}
