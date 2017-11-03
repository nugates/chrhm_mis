
CREATE TABLE [dbo].[BeneficiaryDocuments](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[BeneficiaryID] [bigint] NULL,
	[FileLocation] [varchar](max) NULL,
	[IsActive] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[DocumentName] [varchar](50) NULL,
 CONSTRAINT [PK_BeneficiaryDocuments] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[BeneficiaryDocuments]  WITH CHECK ADD  CONSTRAINT [FK_BeneficiaryDocuments_BeneficiaryEntry] FOREIGN KEY([BeneficiaryID])
REFERENCES [dbo].[BeneficiaryEntry] ([ID])
GO

ALTER TABLE [dbo].[BeneficiaryDocuments] CHECK CONSTRAINT [FK_BeneficiaryDocuments_BeneficiaryEntry]
GO


