namespace Zenith.Dtos
{
    public class ErrorResponse
    {
        public int Status { get; set; }
        public Dictionary<string, string[]>? Errors { get; set; }
    }
}
