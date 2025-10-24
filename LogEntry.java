public class LogEntry {
    private String ipAddress;
    private String status;

    public LogEntry(String ipAddress, String status) {
        this.ipAddress = ipAddress;
        this.status = status;
    }

    public String getIpAddress() { return ipAddress; }
    public String getStatus() { return status; }

    @Override
    public String toString() {
        return "LogEntry{" + "ipAddress='" + ipAddress + '\'' + ", status='" + status + '\'' + '}';
    }
}
