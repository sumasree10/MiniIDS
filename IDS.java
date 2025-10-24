import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class IDS {
    public static void main(String[] args) {
        ArrayList<LogEntry> logs = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            LogEntry log = LogGenerator.generateLog();
            logs.add(log);
            System.out.println(log);

            if (log.getStatus().equals("MALICIOUS")) {
                System.out.println("[ALERT] Suspicious activity detected from " + log.getIpAddress());
            }
        }

        // Save logs.json in web folder
        String filePath = "C:\\Users\\Hasmitha S\\Desktop\\mini-ids\\web\\logs.json";
        try (FileWriter file = new FileWriter(filePath)) {
            file.write("[\n");
            for (int i = 0; i < logs.size(); i++) {
                LogEntry log = logs.get(i);
                file.write("  {\"ip\": \"" + log.getIpAddress() + "\", \"status\": \"" + log.getStatus() + "\"}");
                if (i < logs.size() - 1) file.write(",\n");
            }
            file.write("\n]");
            System.out.println("✅ Logs saved to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
