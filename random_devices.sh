#!/bin/bash
for i in {1..100}
do
mac=$(c=0;until [ $c -eq "6" ];do printf ":%02X" $(( $RANDOM % 256 ));let c=c+1;done|sed s/://)
asset=$(( $RANDOM % 9999 + 1000 ))
location=$(shuf -n 1 locations.txt)
mod=$(shuf -n 1 mods.txt)

   echo "$asset, $mac, $mod"

done > dev.csv