using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Configuration;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;
using System.Collections;

namespace SKMISApplication.Models
{
    public class DBFunctions
    {
        
        //string conString = System.Configuration.ConfigurationManager.ConnectionStrings["truckingCon"].ToString();
        public SqlConnection cvCon = new SqlConnection("server=45.34.14.222; database= SKMIS_DEMO;uid=sa;pwd=sa@sUp0r657");
        private SqlCommand lvCom;
        public SqlDataReader lvRed;
        public String VarHoldOption;
        private SqlCommand cmd;
        public SqlDataReader rdr;
        public DataSet ds = new DataSet();
        private SqlDataAdapter da;
        
        public DataSet SysFetchDataInDataSet(string spName, Hashtable htParam)
        {
            int to = cvCon.ConnectionTimeout;
            IDictionaryEnumerator iEnum = htParam.GetEnumerator();
            cmd = new SqlCommand(spName, cvCon);
            cmd.CommandTimeout = 999999999;
            if (cvCon.State == ConnectionState.Closed)
                cvCon.Open();
            cmd.CommandType = CommandType.StoredProcedure;
            while (iEnum.MoveNext())
            {
                cmd.Parameters.AddWithValue(iEnum.Key.ToString(), iEnum.Value);
            }
            da = new SqlDataAdapter(cmd);
            DataSet ds = new DataSet();
            da.Fill(ds);
            cvCon.Close();
            return ds;
        }
        public DataSet SysFetchDataSet(string spName)
        {
            int to = cvCon.ConnectionTimeout;
            if (ds.Tables.Count > 0)
                ds.Tables[0].Clear();
            cmd = new SqlCommand(spName, cvCon);
            cmd.CommandTimeout = 999999999;
            if (cvCon.State == ConnectionState.Closed)
                cvCon.Open();
            cmd.CommandType = CommandType.Text;
            da = new SqlDataAdapter(cmd);
            da.Fill(ds);
            cvCon.Close();
            return ds;

        }
        public SqlDataReader RunQuery(string query)
        {
            SqlDataReader dr = null;
            SqlConnection cvCon = new SqlConnection(ConfigurationManager.ConnectionStrings["KMITimesheet"].ToString());
            SqlCommand cmd = new SqlCommand(query, cvCon);
            cmd.CommandType = CommandType.Text;

            try
            {
                if (cvCon.State == ConnectionState.Closed)
                    cvCon.Open();
                dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            }
            catch (Exception)
            { }

            return dr;
        }

    }
}