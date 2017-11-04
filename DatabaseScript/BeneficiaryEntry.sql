

CREATE TABLE [dbo].[BeneficiaryEntry](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[FullName] [varchar](50) NULL,
	[DateOfBirth] [date] NULL,
	[FatherOrMotherName] [varchar](50) NULL,
	[MobileNo] [bigint] NULL,
	[Religion] [varchar](50) NULL,
	[EmploymentType] [varchar](50) NULL,
	[AadharNo] [bigint] NULL,
	[Gender] [nvarchar](50) NULL,
	[MaritialStatus] [nvarchar](50) NULL,
	[Caste] [nvarchar](50) NULL,
	[WardID] [bigint] NULL,
	[Qualification] [varchar](50) NULL,
	[Occupation] [varchar](50) NULL,
	[AnnualIncome] [bigint] NULL,
	[Category] [varchar](50) NULL,
	[IsActive] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[ConstituencyID] [int] NULL,
 CONSTRAINT [PK_BeneficiaryEntry_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[BeneficiaryEntry]  WITH CHECK ADD  CONSTRAINT [FK_BeneficiaryEntry_ConstituencyMaster] FOREIGN KEY([ConstituencyID])
REFERENCES [dbo].[ConstituencyMaster] ([ID])
GO

ALTER TABLE [dbo].[BeneficiaryEntry] CHECK CONSTRAINT [FK_BeneficiaryEntry_ConstituencyMaster]
GO


