namespace API.Extensions
{
    public static class DateTimeExtentions
    {
        public static int CalculateAge(this DateTime dot)
        {
            var today = DateTime.Today;
            var age = today.Year - dot.Year;
            if (dot.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}