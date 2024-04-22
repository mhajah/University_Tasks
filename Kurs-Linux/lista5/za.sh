#!/bin/bash

SIZE=512
BS=1M


echo "ZAPIS ZASZYFROWANY RAMDISK /mnt/encrypted_ramdisk/testfile"
dd if=/dev/urandom of=/mnt/encrypted_ramdisk/testfile bs=$BS count=$SIZE conv=fsync

echo "ZAPIS ZASZYFROWANY NVME /tmp/encrypted_container"
dd if=/dev/urandom of=/tmp/encrypted_container bs=$BS count=$SIZE conv=fsync

echo "ZAPIS ZRAM /mnt/zram/testfile"
dd if=/dev/urandom of=/mnt/zram/testfile bs=$BS count=$SIZE oflag=direct conv=fsync

echo "ODCZYT RAMDISK /mnt/zram/testfile"
dd if=/mnt/encrypted_container/testfile of=/dev/null bs=$BS count=$SIZE

echo "ODCZYT NVME /mnt/zram/testfile"
dd if=/tmp/encrypted_container of=/dev/null bs=$BS count=$SIZE

echo "ODCZYT ZRAM /mnt/zram/testfile"
dd if=/mnt/zram/testfile of=/dev/null bs=$BS count=$SIZE

# mkdir /mnt/ramdisk
# mount -t tmpfs -o size=2G tmpfs /mnt/ramdisk
# losetup -f /mnt/ramdisk/encrypted_container
# losetup -a
# mkfs.ext4 /dev/mapper/encrypted_ramdisk
# mkdir /mnt/encrypted_ramdisk
# mount /dev/mapper/encrypted_ramdisk /mnt/encrypted_ramdisk
