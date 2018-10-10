# Deploy

### Copy app from local machine

pscp -r c:/_projects/Qwa/Qwa.Angular/dist/* root@94.177.250.93:/root/


## Configure apache

### Install apache

Additionally, you need to have apache already installed and running on your virtual server If this is not the case, you can download it with this command:

    sudo yum install httpd

### Create a New Directory

    sudo mkdir -p /var/www/example.com/public_html

### Grant Permissions

We need to grant ownership of the directory to the user, instead of just keeping it on the root system.

    sudo chown -R apache:apache /var/www/example.com/public_html

Additionally, it is important to make sure that everyone will be able to read our new files.


    sudo chmod 755 /var/www

### Turn on Virtual Hosts

The next step is to enter into the apache configuration file itself.

    sudo vi /etc/httpd/conf/httpd.conf

There are a few lines to look for.

Make sure that your text matches what you see below.

    #Listen 12.34.56.78:80
    Listen 80

Scroll down to the very bottom of the document to the section called Virtual Hosts.


    NameVirtualHost *:80
    #
    # NOTE: NameVirtualHost cannot be used without a port specifier
    # (e.g. :80) if mod_ssl is being used, due to the nature of the
    # SSL protocol.
    #

    #
    # VirtualHost example:
    # Almost any Apache directive may go into a VirtualHost container.
    # The first VirtualHost section is used for requests without a known
    # server name.
    #
    <VirtualHost *:80>
        ServerAdmin webmaster@example.com
        DocumentRoot /var/www/example.com/public_html
        ServerName www.example.com
        ServerAlias example.com
        ErrorLog /var/www/example.com/error.log
        CustomLog /var/www/example.com/requests.log
    </VirtualHost>

The most important lines to focus on are the lines that say NameVirtualHost, Virtual Host, Document Root, and Server Name. Let’s take these one at a time.

### Restart Apache

First stop all apache processes:

    sudo apachectl -k stop

Then start up apache once again.

    sudo /etc/init.d/httpd start

Alternative command

    service httpd restart

# CentOs

## Tools

### Putty

## Bash commands

## Vim

### See history

You can type history on a terminal to view all the previous executed commands.

### Clear terminal history

    cat /dev/null > ~/.bash_history && history -c && exit

## Apache

# Postgresql

## Common

### Connect with local IDE

#### First approach

connect to PostgreSQL server: FATAL: no pg_hba.conf entry for host

[https://dba.stackexchange.com/questions/83984/connect-to-postgresql-server-fatal-no-pg-hba-conf-entry-for-host](https://dba.stackexchange.com/questions/83984/connect-to-postgresql-server-fatal-no-pg-hba-conf-entry-for-host)

Add or edit the following line in your postgresql.conf :

    listen_addresses = '*'

Add the following line as the first line of pg_hba.conf. It allows access to all databases for all users with an encrypted password:

# TYPE DATABASE USER CIDR-ADDRESS METHOD host all all 0.0.0.0/0 md5

#### Second approach

This solution works for IPv4 / IPv6

    nano /var/lib/pgsql/data/pg_hba.conf

**add at final**

    host all all ::1/128 md5 host all postgres 127.0.0.1/32 md5

and then restart postgresql service

    /etc/init.d/postgresql restart

## Scripts

### Kill a postgresql session/connection

[https://stackoverflow.com/questions/5108876/kill-a-postgresql-session-connection](https://stackoverflow.com/questions/5108876/kill-a-postgresql-session-connection)

You can use [pg_terminate_backend()](http://www.postgresql.org/docs/current/static/functions-admin.html) to kill a connection. You have to be superuser to use this function. This works on all operating systems the same.

SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE -- don't kill my own connection! pid <> pg_backend_pid() -- don't kill the connections to other databases AND datname = 'database_name' ;

Before executing this query, you have to [REVOKE](http://www.postgresql.org/docs/current/interactive/sql-revoke.html) the CONNECT privileges to avoid new connections:

REVOKE CONNECT ON DATABASE dbname FROM PUBLIC, username;

If you're using Postgres 8.4-9.1 use procpid instead of pid

SELECT pg_terminate_backend(procpid) FROM pg_stat_activity WHERE -- don't kill my own connection! procpid <> pg_backend_pid() -- don't kill the connections to other databases AND datname = 'database_name' ;

### Init DB

create schema qwa;

### Install additional modules

    yum update

and then

    sudo yum install postgresql-contrib

[https://tomharrisonjr.com/uuid-or-guid-as-primary-keys-be-careful-7b2aa3dcb439](https://tomharrisonjr.com/uuid-or-guid-as-primary-keys-be-careful-7b2aa3dcb439)

[https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-centos-7](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-centos-7)

[https://www.centos.org/forums/viewtopic.php?t=55818](https://www.centos.org/forums/viewtopic.php?t=55818)

## Bash scripts

### gets the psql command line

As the default configuration of Postgres is, a user called **_postgres _**is made on and the user **_postgres_** has full superadmin access to entire PostgreSQL instance running on your OS.

    $ sudo -u postgres psql

The above command gets you the psql command line interface in full admin mode.

### Exit from postgre command line

Type \q and then press ENTER to quit psql . Ctrl + D is what I usually use to exit psql console. Try: Ctrl + Z - this sends the TSTP signal ( TSTP is short for "terminal stop")

### Creating user

    $ sudo -u postgres createuser <username>

### Creating Database

    $ sudo -u postgres createdb <dbname>

### Giving the user a password

    $ sudo -u postgres psql

    psql=# alter user <username> with encrypted password '<password>';

### Granting privileges on database

    psql=# grant all privileges on database <dbname> to <username> ;

# Git & Github

### Clone repository and commit changes

Goto Github.com

In your account, create a New Repository

Don't create any file inside the repository. Keep it empty. Copy its URL. It should be something like https://github.com/Username/ProjectName.git

Open up the terminal and redirect to your Visual Studio Project directory

1. clone the repo

        git clone https://github.com/zejafo/Qwa
2.
        git config --global user.name "your_git_username"

        git config --global user.email "your_git_email"

3. Then type these commands

        git init

        git add .

        git commit -m "First Migration Commit"

        git remote add origin paste_your_URL_here

        git push -u origin master