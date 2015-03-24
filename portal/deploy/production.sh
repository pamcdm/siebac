#!/bin/bash
ansible-playbook -i deploy/hosts deploy/play.yml --limit qcon.javascript-toolkit.com
