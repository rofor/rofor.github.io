#!/bin/bash
while true
do 
 nmap -sn 192.168.8.0/24 | grep "MAC" | awk '{ print $3 }' > macs_online.txt
    sleep 10
done
