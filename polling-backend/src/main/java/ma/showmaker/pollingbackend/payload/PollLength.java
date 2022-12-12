package ma.showmaker.pollingbackend.payload;

import java.util.Date;

public class PollLength {

    private Integer days;

    private Integer hours;

    private Integer minutes;

    public Integer getMinutes(){
        return minutes;
    }

    public void setMinutes(Integer minutes){
        this.minutes = minutes;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    public Integer getHours() {
        return hours;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }
}
