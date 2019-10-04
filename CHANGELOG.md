# 1.0.0 - Release

* First version

# 1.0.1 - Hotfix

* Pass VUE_APP_GRAPHQL_API  when building Docker image and pass proper env on dev/prod

# 1.0.2 - Release (Failed due incorrect number of changes, messy build)

* Removed mask on phone input on login page

# 1.0.3 - Hotfix

* Removed mask on phone input on login page

# 1.0.4 - Hotfix

* Redirect to edit legal info settings after login for users with role VENDOR_NO_LEGAL_INFO

# 1.1.0 - Release

* Added new button in navigation menu for VENDOR(Fiscalization)
* Added new button in navigation menu for ADMIN(ALL KKTs)
* Added new VENDOR functions(create new kkts and edit some fields own kkts)
* Added new ADMIN functions(create any kkts and edit all their fields)
* Changed table constructor (Table.vue), added color visualisation of dangers for admin


# 1.1.1 - Release

* Added handler for confirmation url from email

# 1.1.2 - Hotfix

* Add filter by machineId in GraphQL query in ControllerSales

# 1.1.3 - Hotfix

* Update text on Confirm page

# 1.1.4 - Release

* Added SNO in company settings
* Added new field (server) in admin interface
* Changed fiscalization path (moved into settings)
* Changed schema of fiscalisation


# 1.1.5 - Release

* Added remotePrinterId in edit Controller and controllers table


# 1.1.6 - Release

* Updated terms of service


# 1.1.7 - Release

* Added machine's kkm selection
* Added all users list with legal info
* Added change balance function

# 1.1.8 - Release

* Added SNO to EditUser

# 1.2.0 - Release

* Added add user balance
* Added feature KKT delete
* Added filtering by machine group in statistics
* Added 2 Encashment pages

# 1.2.1 - Release

* Fixed urgent npe error
* Fixed Encashment select group markup

# 1.2.2 - Release

* Fixed stats machine group selection on first tabk

# 1.3.0 - Release

* On stats page, filter out empty rows
* Added total amount on stats pages 
* When setting controller for machines, only show available controllers in select
