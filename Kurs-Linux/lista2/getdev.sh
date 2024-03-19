#!/bin/bash

# Sprawdzam, czy podano argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 <mount_point>"
    exit 1
fi

mount_point="$1"

device_info=$(grep -E "^\S+\s+$mount_point\s+" /etc/fstab | grep -v '^#')

if [ -z "$device_info" ]; then
    echo "Mount point $mount_point not found in /etc/fstab"
    exit 1
fi

device=$(echo "$device_info" | awk '{print $1}')
filesystem=$(echo "$device_info" | awk '{print $3}')
mount_options=$(echo "$device_info" | awk '{print $4}')
dump_freq=$(echo "$device_info" | awk '{print $5}')
fsck_pass_num=$(echo "$device_info" | awk '{print $6}')

echo "Device: $device"
echo "Filesystem type: $filesystem"
echo "Mount options: $mount_options"
echo "Dump frequency: $dump_freq"
echo "Fsck pass number: $fsck_pass_num"
