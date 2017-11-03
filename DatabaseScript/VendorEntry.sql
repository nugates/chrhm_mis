

CREATE TABLE [dbo].[VendorEntry](
	[VendorId] [bigint] IDENTITY(1,1) NOT NULL,
	[VendorName] [nvarchar](max) NULL,
	[VendorAddress] [nvarchar](max) NULL,
	[City] [nvarchar](max) NULL,
	[Country] [nvarchar](max) NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedDate] [date] NULL,
	[UpdatedBy] [varbinary](50) NULL,
	[UpdatedDate] [date] NULL,
	[State] [nvarchar](max) NULL,
	[PinCode] [bigint] NULL,
	[MobileNo] [bigint] NULL,
	[PhoneNo] [bigint] NULL,
	[Fax] [bigint] NULL,
	[Email] [nvarchar](max) NULL,
	[Website] [nvarchar](max) NULL,
	[Misc] [nvarchar](max) NULL,
 CONSTRAINT [PK_VendorEntry] PRIMARY KEY CLUSTERED 
(
	[VendorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


