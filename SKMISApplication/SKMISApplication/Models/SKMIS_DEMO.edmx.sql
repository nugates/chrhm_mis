
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 12/01/2017 12:29:29
-- Generated from EDMX file: C:\inetpub\wwwroot\CRHMMIS_STAGING\SKMISApplication\SKMISApplication\Models\SKMIS_DEMO.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [SKMIS_DEMO];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_BeneficiaryDocuments_BeneficiaryEntry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[BeneficiaryDocuments] DROP CONSTRAINT [FK_BeneficiaryDocuments_BeneficiaryEntry];
GO
IF OBJECT_ID(N'[dbo].[FK_BeneficiaryEntry_BeneficiaryEntry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[BeneficiaryEntry] DROP CONSTRAINT [FK_BeneficiaryEntry_BeneficiaryEntry];
GO
IF OBJECT_ID(N'[dbo].[FK_BeneficiaryEntry_BlockMaster]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[BeneficiaryEntry] DROP CONSTRAINT [FK_BeneficiaryEntry_BlockMaster];
GO
IF OBJECT_ID(N'[dbo].[FK_BeneficiaryEntry_ConstituencyMaster]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[BeneficiaryEntry] DROP CONSTRAINT [FK_BeneficiaryEntry_ConstituencyMaster];
GO
IF OBJECT_ID(N'[dbo].[FK_InventoryMaster_ItemMaster]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[InventoryMaster] DROP CONSTRAINT [FK_InventoryMaster_ItemMaster];
GO
IF OBJECT_ID(N'[dbo].[FK_InventoryMaster_StoreMaster]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[InventoryMaster] DROP CONSTRAINT [FK_InventoryMaster_StoreMaster];
GO
IF OBJECT_ID(N'[dbo].[FK_ItemAllocation_ConstituencyMaster]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ItemAllocation] DROP CONSTRAINT [FK_ItemAllocation_ConstituencyMaster];
GO
IF OBJECT_ID(N'[dbo].[FK_ItemAllocation_ItemMaster]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ItemAllocation] DROP CONSTRAINT [FK_ItemAllocation_ItemMaster];
GO
IF OBJECT_ID(N'[dbo].[FK_ItemMaster_UnitMaster]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ItemMaster] DROP CONSTRAINT [FK_ItemMaster_UnitMaster];
GO
IF OBJECT_ID(N'[dbo].[FK_VendorMaster_VendorType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[VendorMaster] DROP CONSTRAINT [FK_VendorMaster_VendorType];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[ADCMaster]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ADCMaster];
GO
IF OBJECT_ID(N'[dbo].[BeneficiaryDocuments]', 'U') IS NOT NULL
    DROP TABLE [dbo].[BeneficiaryDocuments];
GO
IF OBJECT_ID(N'[dbo].[BeneficiaryEntry]', 'U') IS NOT NULL
    DROP TABLE [dbo].[BeneficiaryEntry];
GO
IF OBJECT_ID(N'[dbo].[BlockMaster]', 'U') IS NOT NULL
    DROP TABLE [dbo].[BlockMaster];
GO
IF OBJECT_ID(N'[dbo].[ConstituencyMaster]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ConstituencyMaster];
GO
IF OBJECT_ID(N'[dbo].[GPUMaster]', 'U') IS NOT NULL
    DROP TABLE [dbo].[GPUMaster];
GO
IF OBJECT_ID(N'[dbo].[InventoryMaster]', 'U') IS NOT NULL
    DROP TABLE [dbo].[InventoryMaster];
GO
IF OBJECT_ID(N'[dbo].[ItemAllocation]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ItemAllocation];
GO
IF OBJECT_ID(N'[dbo].[ItemMaster]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ItemMaster];
GO
IF OBJECT_ID(N'[dbo].[StoreMaster]', 'U') IS NOT NULL
    DROP TABLE [dbo].[StoreMaster];
GO
IF OBJECT_ID(N'[dbo].[UnitMaster]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UnitMaster];
GO
IF OBJECT_ID(N'[dbo].[VendorMaster]', 'U') IS NOT NULL
    DROP TABLE [dbo].[VendorMaster];
GO
IF OBJECT_ID(N'[dbo].[VendorType]', 'U') IS NOT NULL
    DROP TABLE [dbo].[VendorType];
GO
IF OBJECT_ID(N'[dbo].[WardMaster]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WardMaster];
GO
IF OBJECT_ID(N'[SKMIS_DEMOModelStoreContainer].[UserMaster]', 'U') IS NOT NULL
    DROP TABLE [SKMIS_DEMOModelStoreContainer].[UserMaster];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'ADCMasters'
CREATE TABLE [dbo].[ADCMasters] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [ADC_DevSubDiv] varchar(50)  NULL,
    [Description] nvarchar(max)  NULL,
    [IsActive] bit  NULL
);
GO

-- Creating table 'BeneficiaryDocuments'
CREATE TABLE [dbo].[BeneficiaryDocuments] (
    [ID] bigint IDENTITY(1,1) NOT NULL,
    [BeneficiaryID] bigint  NULL,
    [FileLocation] varchar(max)  NULL,
    [IsActive] bit  NULL,
    [CreatedDate] datetime  NULL,
    [CreatedBy] int  NULL,
    [UpdatedDate] datetime  NULL,
    [UpdatedBy] int  NULL,
    [DocumentName] varchar(50)  NULL
);
GO

-- Creating table 'BeneficiaryEntries'
CREATE TABLE [dbo].[BeneficiaryEntries] (
    [ID] bigint IDENTITY(1,1) NOT NULL,
    [AllotmentNo] varchar(50)  NULL,
    [BeneficiaryName] varchar(50)  NULL,
    [MobileNo] bigint  NULL,
    [AadharNo] bigint  NULL,
    [WardName] varchar(150)  NULL,
    [ConstituencyID] int  NULL,
    [BlockID] int  NULL,
    [GPUName] varchar(150)  NULL,
    [ADCID] int  NULL,
    [IsActive] bit  NULL,
    [CreatedDate] datetime  NULL,
    [CreatedBy] int  NULL,
    [UpdatedDate] datetime  NULL,
    [UpdatedBy] int  NULL,
    [FormID] varchar(150)  NULL
);
GO

-- Creating table 'BlockMasters'
CREATE TABLE [dbo].[BlockMasters] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [BlockName] varchar(150)  NULL,
    [Description] nvarchar(max)  NULL,
    [IsActive] bit  NULL
);
GO

-- Creating table 'ConstituencyMasters'
CREATE TABLE [dbo].[ConstituencyMasters] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Constituency] varchar(150)  NULL,
    [Description] nvarchar(max)  NULL,
    [IsActive] bit  NULL
);
GO

-- Creating table 'ItemAllocations'
CREATE TABLE [dbo].[ItemAllocations] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [BeneficiaryID] bigint  NULL,
    [ItemID] int  NULL,
    [Quantity] decimal(18,2)  NULL,
    [IssueDate] datetime  NULL,
    [CreatedDate] datetime  NULL,
    [CreatedBy] varchar(50)  NULL,
    [UpdatedBy] varchar(50)  NULL,
    [UpdatedDate] datetime  NULL,
    [ConstituencyID] int  NULL,
    [VehicleNo] varchar(50)  NULL,
    [OrderPlaceBy] varchar(50)  NULL,
    [ChallanNo] varchar(50)  NULL,
    [IsActive] bit  NULL
);
GO

-- Creating table 'ItemMasters'
CREATE TABLE [dbo].[ItemMasters] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [ItemCode] int  NULL,
    [ItemName] nvarchar(max)  NULL,
    [Limit] decimal(18,2)  NULL,
    [UnitID] int  NULL,
    [CreatedBy] varchar(150)  NULL,
    [CreatedDate] datetime  NULL,
    [UpdatedBy] varchar(150)  NULL,
    [UpdatedDate] datetime  NULL,
    [IsActive] bit  NULL
);
GO

-- Creating table 'StoreMasters'
CREATE TABLE [dbo].[StoreMasters] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [StoreName] varchar(50)  NULL,
    [IsActive] bit  NULL
);
GO

-- Creating table 'VendorTypes'
CREATE TABLE [dbo].[VendorTypes] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [VendorType1] varchar(50)  NULL,
    [IsActive] bit  NULL
);
GO

-- Creating table 'WardMasters'
CREATE TABLE [dbo].[WardMasters] (
    [ID] varchar(150)  NOT NULL,
    [WardNumber] int  NULL,
    [WardName] nvarchar(max)  NULL,
    [RevenueBlock] nvarchar(max)  NULL,
    [Description] nvarchar(max)  NULL,
    [IsActive] bit  NULL,
    [CreatedDate] datetime  NULL,
    [CreatedBy] int  NULL,
    [UpdatedDate] datetime  NULL,
    [UpdatedBy] int  NULL
);
GO

-- Creating table 'UserMasters'
CREATE TABLE [dbo].[UserMasters] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [UserID] varchar(50)  NULL,
    [Password] varchar(50)  NULL,
    [CompanyID] int  NULL,
    [UserType] varchar(50)  NULL,
    [StoreID] int  NULL
);
GO

-- Creating table 'GPUMasters'
CREATE TABLE [dbo].[GPUMasters] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [GPUName] varchar(150)  NULL,
    [Description] nvarchar(max)  NULL,
    [IsActive] bit  NULL
);
GO

-- Creating table 'VendorMasters'
CREATE TABLE [dbo].[VendorMasters] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Name] varchar(150)  NULL,
    [Address] nvarchar(max)  NULL,
    [Phone] varchar(50)  NULL,
    [VendorTypeID] int  NULL,
    [ACName] varchar(50)  NULL,
    [ACNumber] varchar(50)  NULL,
    [BankName] varchar(50)  NULL,
    [IFSC] varchar(50)  NULL,
    [DocumentPath] varchar(250)  NULL,
    [CreatedDate] datetime  NULL,
    [CreatedBy] varchar(50)  NULL,
    [IsActive] bit  NULL,
    [PanCard] varchar(50)  NULL,
    [BranchName] varchar(50)  NULL
);
GO

-- Creating table 'UnitMasters'
CREATE TABLE [dbo].[UnitMasters] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [UnitName] varchar(50)  NULL,
    [IsActive] bit  NULL
);
GO

-- Creating table 'InventoryMasters'
CREATE TABLE [dbo].[InventoryMasters] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [ItemID] int  NULL,
    [StoreID] int  NULL,
    [VehicleNo] varchar(50)  NULL,
    [Quantity] decimal(18,2)  NULL,
    [CreatedDate] datetime  NULL,
    [IsActive] bit  NULL,
    [InvoiceNo] varchar(50)  NULL,
    [ChallanNo] varchar(50)  NULL,
    [Note] nvarchar(max)  NULL,
    [CreatedBy] int  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [ID] in table 'ADCMasters'
ALTER TABLE [dbo].[ADCMasters]
ADD CONSTRAINT [PK_ADCMasters]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'BeneficiaryDocuments'
ALTER TABLE [dbo].[BeneficiaryDocuments]
ADD CONSTRAINT [PK_BeneficiaryDocuments]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'BeneficiaryEntries'
ALTER TABLE [dbo].[BeneficiaryEntries]
ADD CONSTRAINT [PK_BeneficiaryEntries]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'BlockMasters'
ALTER TABLE [dbo].[BlockMasters]
ADD CONSTRAINT [PK_BlockMasters]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'ConstituencyMasters'
ALTER TABLE [dbo].[ConstituencyMasters]
ADD CONSTRAINT [PK_ConstituencyMasters]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'ItemAllocations'
ALTER TABLE [dbo].[ItemAllocations]
ADD CONSTRAINT [PK_ItemAllocations]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'ItemMasters'
ALTER TABLE [dbo].[ItemMasters]
ADD CONSTRAINT [PK_ItemMasters]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'StoreMasters'
ALTER TABLE [dbo].[StoreMasters]
ADD CONSTRAINT [PK_StoreMasters]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'VendorTypes'
ALTER TABLE [dbo].[VendorTypes]
ADD CONSTRAINT [PK_VendorTypes]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'WardMasters'
ALTER TABLE [dbo].[WardMasters]
ADD CONSTRAINT [PK_WardMasters]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'UserMasters'
ALTER TABLE [dbo].[UserMasters]
ADD CONSTRAINT [PK_UserMasters]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'GPUMasters'
ALTER TABLE [dbo].[GPUMasters]
ADD CONSTRAINT [PK_GPUMasters]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'VendorMasters'
ALTER TABLE [dbo].[VendorMasters]
ADD CONSTRAINT [PK_VendorMasters]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'UnitMasters'
ALTER TABLE [dbo].[UnitMasters]
ADD CONSTRAINT [PK_UnitMasters]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'InventoryMasters'
ALTER TABLE [dbo].[InventoryMasters]
ADD CONSTRAINT [PK_InventoryMasters]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [ADCID] in table 'BeneficiaryEntries'
ALTER TABLE [dbo].[BeneficiaryEntries]
ADD CONSTRAINT [FK_BeneficiaryEntry_BeneficiaryEntry]
    FOREIGN KEY ([ADCID])
    REFERENCES [dbo].[ADCMasters]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_BeneficiaryEntry_BeneficiaryEntry'
CREATE INDEX [IX_FK_BeneficiaryEntry_BeneficiaryEntry]
ON [dbo].[BeneficiaryEntries]
    ([ADCID]);
GO

-- Creating foreign key on [BeneficiaryID] in table 'BeneficiaryDocuments'
ALTER TABLE [dbo].[BeneficiaryDocuments]
ADD CONSTRAINT [FK_BeneficiaryDocuments_BeneficiaryEntry]
    FOREIGN KEY ([BeneficiaryID])
    REFERENCES [dbo].[BeneficiaryEntries]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_BeneficiaryDocuments_BeneficiaryEntry'
CREATE INDEX [IX_FK_BeneficiaryDocuments_BeneficiaryEntry]
ON [dbo].[BeneficiaryDocuments]
    ([BeneficiaryID]);
GO

-- Creating foreign key on [BlockID] in table 'BeneficiaryEntries'
ALTER TABLE [dbo].[BeneficiaryEntries]
ADD CONSTRAINT [FK_BeneficiaryEntry_BlockMaster]
    FOREIGN KEY ([BlockID])
    REFERENCES [dbo].[BlockMasters]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_BeneficiaryEntry_BlockMaster'
CREATE INDEX [IX_FK_BeneficiaryEntry_BlockMaster]
ON [dbo].[BeneficiaryEntries]
    ([BlockID]);
GO

-- Creating foreign key on [ConstituencyID] in table 'BeneficiaryEntries'
ALTER TABLE [dbo].[BeneficiaryEntries]
ADD CONSTRAINT [FK_BeneficiaryEntry_ConstituencyMaster]
    FOREIGN KEY ([ConstituencyID])
    REFERENCES [dbo].[ConstituencyMasters]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_BeneficiaryEntry_ConstituencyMaster'
CREATE INDEX [IX_FK_BeneficiaryEntry_ConstituencyMaster]
ON [dbo].[BeneficiaryEntries]
    ([ConstituencyID]);
GO

-- Creating foreign key on [ConstituencyID] in table 'ItemAllocations'
ALTER TABLE [dbo].[ItemAllocations]
ADD CONSTRAINT [FK_ItemAllocation_ConstituencyMaster]
    FOREIGN KEY ([ConstituencyID])
    REFERENCES [dbo].[ConstituencyMasters]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ItemAllocation_ConstituencyMaster'
CREATE INDEX [IX_FK_ItemAllocation_ConstituencyMaster]
ON [dbo].[ItemAllocations]
    ([ConstituencyID]);
GO

-- Creating foreign key on [ItemID] in table 'ItemAllocations'
ALTER TABLE [dbo].[ItemAllocations]
ADD CONSTRAINT [FK_ItemAllocation_ItemMaster]
    FOREIGN KEY ([ItemID])
    REFERENCES [dbo].[ItemMasters]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ItemAllocation_ItemMaster'
CREATE INDEX [IX_FK_ItemAllocation_ItemMaster]
ON [dbo].[ItemAllocations]
    ([ItemID]);
GO

-- Creating foreign key on [VendorTypeID] in table 'VendorMasters'
ALTER TABLE [dbo].[VendorMasters]
ADD CONSTRAINT [FK_VendorMaster_VendorType]
    FOREIGN KEY ([VendorTypeID])
    REFERENCES [dbo].[VendorTypes]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_VendorMaster_VendorType'
CREATE INDEX [IX_FK_VendorMaster_VendorType]
ON [dbo].[VendorMasters]
    ([VendorTypeID]);
GO

-- Creating foreign key on [UnitID] in table 'ItemMasters'
ALTER TABLE [dbo].[ItemMasters]
ADD CONSTRAINT [FK_ItemMaster_UnitMaster]
    FOREIGN KEY ([UnitID])
    REFERENCES [dbo].[UnitMasters]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ItemMaster_UnitMaster'
CREATE INDEX [IX_FK_ItemMaster_UnitMaster]
ON [dbo].[ItemMasters]
    ([UnitID]);
GO

-- Creating foreign key on [ItemID] in table 'InventoryMasters'
ALTER TABLE [dbo].[InventoryMasters]
ADD CONSTRAINT [FK_InventoryMaster_ItemMaster]
    FOREIGN KEY ([ItemID])
    REFERENCES [dbo].[ItemMasters]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_InventoryMaster_ItemMaster'
CREATE INDEX [IX_FK_InventoryMaster_ItemMaster]
ON [dbo].[InventoryMasters]
    ([ItemID]);
GO

-- Creating foreign key on [StoreID] in table 'InventoryMasters'
ALTER TABLE [dbo].[InventoryMasters]
ADD CONSTRAINT [FK_InventoryMaster_StoreMaster]
    FOREIGN KEY ([StoreID])
    REFERENCES [dbo].[StoreMasters]
        ([ID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_InventoryMaster_StoreMaster'
CREATE INDEX [IX_FK_InventoryMaster_StoreMaster]
ON [dbo].[InventoryMasters]
    ([StoreID]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------