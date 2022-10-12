package ma.showmaker.pollingbackend.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "polls")
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String question;

    @OneToMany(mappedBy = "poll",
                cascade = CascadeType.ALL,
                fetch = FetchType.EAGER,
                orphanRemoval = true
    )
    private List<Choice> choices;

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
}
