<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EstoreSummaryReport.aspx.cs" Inherits="SKMISApplication.ReportsView.EstoreSummaryReport" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
<link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="../plugins/datatables/dataTables.bootstrap.css" />
<script src="../bootstrap/js/bootstrap.min.js"></script>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div id="table-container">
            <div></div>
            <div id="container">
                <div id="main">
                    <div style="margin: 0 auto;text-align: left;width: 800px;">
                    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
                    <rsweb:ReportViewer ID="estoresummaryRpt" runat="server" PageCountMode="Actual" DocumentMapWidth="30%" SizeToReportContent="True" HyperlinkTarget="_blank"></rsweb:ReportViewer>
                    </div>
                    <%--<rsweb:ReportViewer ID="estoresummaryRpt" runat="server" PageCountMode="Actual" DocumentMapWidth="30%" SizeToReportContent="True" HyperlinkTarget="_blank">                        
                    </rsweb:ReportViewer>--%>
                    <%--<rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="476px" Height="100px">
                        <LocalReport ReportPath="Reports/rptEstoreSummary.rdlc">
                        </LocalReport>
                    </rsweb:ReportViewer>--%>
                </div>
            </div>
        </div>
    </form>
</body>
</html>

