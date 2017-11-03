

CREATE TABLE [dbo].[DriverEntry](
	[DriverId] [bigint] IDENTITY(1,1) NOT NULL,
	[DriverName] [nvarchar](max) NULL,
	[DriverContactNumber] [bigint] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedDate] [date] NULL,
	[UpdatedBy] [varchar](50) NULL,
	[UpdatedDate] [date] NULL,
	[WorkContactNumber] [bigint] NULL,
	[EmailID] [nvarchar](max) NULL,
	[ImagePath] [nvarchar](max) NULL,
	[LicenseNo] [nvarchar](max) NULL,
	[LicenseState] [nvarchar](max) NULL,
	[LicenseExpiryDate] [datetime] NULL,
	[DOB] [datetime] NULL,
	[AlternateContactNo] [bigint] NULL,
	[DriverAddress] [nvarchar](max) NULL,
	[City] [nvarchar](max) NULL,
	[Pin] [nvarchar](max) NULL,
	[Misc] [nvarchar](max) NULL,
 CONSTRAINT [PK_DriverEntry] PRIMARY KEY CLUSTERED 
(
	[DriverId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


