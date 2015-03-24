#!/bin/bash
ansible-playbook -i deploy/hosts deploy/play.yml --limit staging.qcon.javascript-toolkit.com
