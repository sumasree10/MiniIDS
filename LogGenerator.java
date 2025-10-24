import java.util.Random;

public class LogGenerator {
    private static Random rand = new Random();

    public static LogEntry generateLog() {
        String ip = "192.168.1." + rand.nextInt(256);
        String status = rand.nextBoolean() ? "NORMAL" : "MALICIOUS";
        return new LogEntry(ip, status);
    }
}
