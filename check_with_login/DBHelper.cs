using System.Configuration;
using System.Data.SqlClient;

public class DBHelper
{
    public static SqlConnection GetConnection()
    {
        return new SqlConnection(
            ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString
        );
    }
}
