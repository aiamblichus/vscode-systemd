import { List } from "immutable";

export interface SettingInfo {
    name: string;
    choices: string[];
    doc: string;
}

export interface SectionInfo {
    name: string;
    fileMatch: RegExp;
    doc: string;
    settings: List<SettingInfo>;
}

let execSettings = List<SettingInfo>([
    {
        "name": "WorkingDirectory",
        "choices": [],
        "doc": "Takes a directory path relative to the service's root directory specified by RootDirectory=, or the special value \"~\". Sets the working directory for executed processes. If set to \"~\", the home directory of the user specified in User= is used. If not set, defaults to the root directory when systemd is running as a system instance and the respective user's home directory if run as user. If the setting is prefixed with the \"-\" character, a missing working directory is not considered fatal. If RootDirectory=/RootImage= is not set, then WorkingDirectory= is relative to the root of the system running the service manager. Note that setting this parameter might result in additional dependencies to be added to the unit (see above)."
    },
    {
        "name": "RootDirectory",
        "choices": [],
        "doc": "Takes a directory path relative to the host's root directory (i.e. the root of the system running the service manager). Sets the root directory for executed processes, with the chroot(2) system call. If this is used, it must be ensured that the process binary and all its auxiliary files are available in the chroot() jail. Note that setting this parameter might result in additional dependencies to be added to the unit (see above).\n\nThe MountAPIVFS= and PrivateUsers= settings are particularly useful in conjunction with RootDirectory=. For details, see below."
    },
    {
        "name": "RootImage",
        "choices": [],
        "doc": "Takes a path to a block device node or regular file as argument. This call is similar to RootDirectory= however mounts a file system hierarchy from a block device node or loopack file instead of a directory. The device node or file system image file needs to contain a file system without a partition table, or a file system within an MBR/MS-DOS or GPT partition table with only a single Linux-compatible partition, or a set of file systems within a GPT partition table that follows the Discoverable Partitions Specification."
    },
    {
        "name": "MountAPIVFS",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If on, a private mount namespace for the unit's processes is created and the API file systems /proc, /sys, and /dev are mounted inside of it, unless they are already mounted. Note that this option has no effect unless used in conjunction with RootDirectory=/RootImage= as these three mounts are generally mounted in the host anyway, and unless the root directory is changed, the private mount namespace will be a 1:1 copy of the host's, and include these three mounts. Note that the /dev file system of the host is bind mounted if this option is used without PrivateDevices=. To run the service with a private, minimal version of /dev/, combine this option with PrivateDevices=."
    },
    {
        "name": "User",
        "choices": [],
        "doc": "Set the UNIX user or group that the processes are executed as, respectively. Takes a single user or group name, or numeric ID as argument. For system services (services run by the system service manager, i.e. managed by PID 1) and for user services of the root user (services managed by root's instance of systemd --user), the default is \"root\", but User= may be used to specify a different user. For user services of any other user, switching user identity is not permitted, hence the only valid setting is the same user the user's service manager is running as. If no group is set, the default group of the user is used. This setting does not affect commands whose command line is prefixed with \"+\"."
    },
    {
        "name": "DynamicUser",
        "choices": ["true", "false"],
        "doc": "Takes a boolean parameter. If set, a UNIX user and group pair is allocated dynamically when the unit is started, and released as soon as it is stopped. The user and group will not be added to /etc/passwd or /etc/group, but are managed transiently during runtime. The nss-systemd(8) glibc NSS module provides integration of these dynamic users/groups into the system's user and group databases. The user and group name to use may be configured via User= and Group= (see above). If these options are not used and dynamic user/group allocation is enabled for a unit, the name of the dynamic user/group is implicitly derived from the unit name. If the unit name without the type suffix qualifies as valid user name it is used directly, otherwise a name incorporating a hash of it is used. If a statically allocated user or group of the configured name already exists, it is used and no dynamic user/group is allocated. Dynamic users/groups are allocated from the UID/GID range 61184…65519. It is recommended to avoid this range for regular system or login users. At any point in time each UID/GID from this range is only assigned to zero or one dynamically allocated users/groups in use. However, UID/GIDs are recycled after a unit is terminated. Care should be taken that any processes running as part of a unit for which dynamic users/groups are enabled do not leave files or directories owned by these users/groups around, as a different unit might get the same UID/GID assigned later on, and thus gain access to these files or directories. If DynamicUser= is enabled, RemoveIPC=, PrivateTmp= are implied. This ensures that the lifetime of IPC objects and temporary files created by the executed processes is bound to the runtime of the service, and hence the lifetime of the dynamic user/group. Since /tmp and /var/tmp are usually the only world-writable directories on a system this ensures that a unit making use of dynamic user/group allocation cannot leave files around after unit termination. Moreover ProtectSystem=strict and ProtectHome=read-only are implied, thus prohibiting the service to write to arbitrary file system locations. In order to allow the service to write to certain directories, they have to be whitelisted using ReadWritePaths=, but care must be taken so that UID/GID recycling doesn't create security issues involving files created by the service. Use RuntimeDirectory= (see below) in order to assign a writable runtime directory to a service, owned by the dynamic user/group and removed automatically when the unit is terminated. Defaults to off."
    },
    {
        "name": "SupplementaryGroups",
        "choices": [],
        "doc": "Sets the supplementary Unix groups the processes are executed as. This takes a space-separated list of group names or IDs. This option may be specified more than once, in which case all listed groups are set as supplementary groups. When the empty string is assigned, the list of supplementary groups is reset, and all assignments prior to this one will have no effect. In any way, this option does not override, but extends the list of supplementary groups configured in the system group database for the user. This does not affect commands prefixed with \"+\"."
    },
    {
        "name": "RemoveIPC",
        "choices": ["true", "false"],
        "doc": "Takes a boolean parameter. If set, all System V and POSIX IPC objects owned by the user and group the processes of this unit are run as are removed when the unit is stopped. This setting only has an effect if at least one of User=, Group= and DynamicUser= are used. It has no effect on IPC objects owned by the root user. Specifically, this removes System V semaphores, as well as System V and POSIX shared memory segments and message queues. If multiple units use the same user or group the IPC objects are removed when the last of these units is stopped. This setting is implied if DynamicUser= is set."
    },
    {
        "name": "Nice",
        "choices": [],
        "doc": "Sets the default nice level (scheduling priority) for executed processes. Takes an integer between -20 (highest priority) and 19 (lowest priority). See setpriority(2) for details."
    },
    {
        "name": "OOMScoreAdjust",
        "choices": [],
        "doc": "Sets the adjustment level for the Out-Of-Memory killer for executed processes. Takes an integer between -1000 (to disable OOM killing for this process) and 1000 (to make killing of this process under memory pressure very likely). See proc.txt for details."
    },
    {
        "name": "IOSchedulingClass",
        "choices": ["0","1","2","3", "none", "realtime", "best-effort", "idle"],
        "doc": "Sets the I/O scheduling class for executed processes. Takes an integer between 0 and 3 or one of the strings none, realtime, best-effort or idle. See ioprio_set(2) for details."
    },
    {
        "name": "IOSchedulingPriority",
        "choices": ["0","1","2","3","4","5","6","7"],
        "doc": "Sets the I/O scheduling priority for executed processes. Takes an integer between 0 (highest priority) and 7 (lowest priority). The available priorities depend on the selected I/O scheduling class (see above). See ioprio_set(2) for details."
    },
    {
        "name": "CPUSchedulingPolicy",
        "choices": ["other", "batch", "idle", "fifo", "rr"],
        "doc": "Sets the CPU scheduling policy for executed processes. Takes one of other, batch, idle, fifo or rr. See sched_setscheduler(2) for details."
    },
    {
        "name": "CPUSchedulingPriority",
        "choices": [],
        "doc": "Sets the CPU scheduling priority for executed processes. The available priority range depends on the selected CPU scheduling policy (see above). For real-time scheduling policies an integer between 1 (lowest priority) and 99 (highest priority) can be used. See sched_setscheduler(2) for details."
    },
    {
        "name": "CPUSchedulingResetOnFork",
        "choices": [],
        "doc": "Takes a boolean argument. If true, elevated CPU scheduling priorities and policies will be reset when the executed processes fork, and can hence not leak into child processes. See sched_setscheduler(2) for details. Defaults to false."
    },
    {
        "name": "CPUAffinity",
        "choices": [],
        "doc": "Controls the CPU affinity of the executed processes. Takes a list of CPU indices or ranges separated by either whitespace or commas. CPU ranges are specified by the lower and upper CPU indices separated by a dash. This option may be specified more than once, in which case the specified CPU affinity masks are merged. If the empty string is assigned, the mask is reset, all assignments prior to this will have no effect. See sched_setaffinity(2) for details."
    },
    {
        "name": "UMask",
        "choices": [],
        "doc": "Controls the file mode creation mask. Takes an access mode in octal notation. See umask(2) for details. Defaults to 0022."
    },
    {
        "name": "Environment",
        "choices": [],
        "doc": "Sets environment variables for executed processes. Takes a space-separated list of variable assignments. This option may be specified more than once, in which case all listed variables will be set. If the same variable is set twice, the later setting will override the earlier setting. If the empty string is assigned to this option, the list of environment variables is reset, all prior assignments have no effect. Variable expansion is not performed inside the strings, however, specifier expansion is possible. The $ character has no special meaning. If you need to assign a value containing spaces to a variable, use double quotes (\") for the assignment.\n\nExample:\n\nEnvironment=\"VAR1=word1 word2\" VAR2=word3 \"VAR3=$word 5 6\"\ngives three variables \"VAR1\", \"VAR2\", \"VAR3\" with the values \"word1 word2\", \"word3\", \"$word 5 6\".\n\nSee environ(7) for details about environment variables."
    },
    {
        "name": "EnvironmentFile",
        "choices": [],
        "doc": "Similar to Environment= but reads the environment variables from a text file. The text file should contain new-line-separated variable assignments. Empty lines, lines without an \"=\" separator, or lines starting with ; or # will be ignored, which may be used for commenting. A line ending with a backslash will be concatenated with the following one, allowing multiline variable definitions. The parser strips leading and trailing whitespace from the values of assignments, unless you use double quotes (\").\n\nThe argument passed should be an absolute filename or wildcard expression, optionally prefixed with \"-\", which indicates that if the file does not exist, it will not be read and no error or warning message is logged. This option may be specified more than once in which case all specified files are read. If the empty string is assigned to this option, the list of file to read is reset, all prior assignments have no effect.\n\nThe files listed with this directive will be read shortly before the process is executed (more specifically, after all processes from a previous unit state terminated. This means you can generate these files in one unit state, and read it with this option in the next).\n\nSettings from these files override settings made with Environment=. If the same variable is set twice from these files, the files will be read in the order they are specified and the later setting will override the earlier setting."
    },
    {
        "name": "PassEnvironment",
        "choices": [],
        "doc": "Pass environment variables from the systemd system manager to executed processes. Takes a space-separated list of variable names. This option may be specified more than once, in which case all listed variables will be set. If the empty string is assigned to this option, the list of environment variables is reset, all prior assignments have no effect. Variables that are not set in the system manager will not be passed and will be silently ignored.\n\nVariables passed from this setting are overridden by those passed from Environment= or EnvironmentFile=.\n\nExample:\n\nPassEnvironment=VAR1 VAR2 VAR3\npasses three variables \"VAR1\", \"VAR2\", \"VAR3\" with the values set for those variables in PID1.\n\nSee environ(7) for details about environment variables."
    },
    {
        "name": "StandardInput",
        "choices": [],
        "doc": "Controls where file descriptor 0 (STDIN) of the executed processes is connected to. Takes one of null, tty, tty-force, tty-fail, socket or fd.\n\nIf null is selected, standard input will be connected to /dev/null, i.e. all read attempts by the process will result in immediate EOF.\n\nIf tty is selected, standard input is connected to a TTY (as configured by TTYPath=, see below) and the executed process becomes the controlling process of the terminal. If the terminal is already being controlled by another process, the executed process waits until the current controlling process releases the terminal.\n\ntty-force is similar to tty, but the executed process is forcefully and immediately made the controlling process of the terminal, potentially removing previous controlling processes from the terminal.\n\ntty-fail is similar to tty but if the terminal already has a controlling process start-up of the executed process fails.\n\nThe socket option is only valid in socket-activated services, and only when the socket configuration file (see systemd.socket(5) for details) specifies a single socket only. If this option is set, standard input will be connected to the socket the service was activated from, which is primarily useful for compatibility with daemons designed for use with the traditional inetd(8) daemon.\n\nThe fd option connects the input stream to a single file descriptor provided by a socket unit. A custom named file descriptor can be specified as part of this option, after a \":\" (e.g. \"fd:foobar\"). If no name is specified, \"stdin\" is assumed (i.e. \"fd\" is equivalent to \"fd:stdin\"). At least one socket unit defining such name must be explicitly provided via the Sockets= option, and file descriptor name may differ from the name of its containing socket unit. If multiple matches are found, the first one will be used. See FileDescriptorName= in systemd.socket(5) for more details about named descriptors and ordering.\n\nThis setting defaults to null."
    },
    {
        "name": "StandardOutput",
        "choices": [],
        "doc": "Controls where file descriptor 1 (STDOUT) of the executed processes is connected to. Takes one of inherit, null, tty, journal, syslog, kmsg, journal+console, syslog+console, kmsg+console, socket or fd.\n\ninherit duplicates the file descriptor of standard input for standard output.\n\nnull connects standard output to /dev/null, i.e. everything written to it will be lost.\n\ntty connects standard output to a tty (as configured via TTYPath=, see below). If the TTY is used for output only, the executed process will not become the controlling process of the terminal, and will not fail or wait for other processes to release the terminal.\n\njournal connects standard output with the journal which is accessible via journalctl(1). Note that everything that is written to syslog or kmsg (see below) is implicitly stored in the journal as well, the specific two options listed below are hence supersets of this one.\n\nsyslog connects standard output to the syslog(3) system syslog service, in addition to the journal. Note that the journal daemon is usually configured to forward everything it receives to syslog anyway, in which case this option is no different from journal.\n\nkmsg connects standard output with the kernel log buffer which is accessible via dmesg(1), in addition to the journal. The journal daemon might be configured to send all logs to kmsg anyway, in which case this option is no different from journal.\n\njournal+console, syslog+console and kmsg+console work in a similar way as the three options above but copy the output to the system console as well.\n\nsocket connects standard output to a socket acquired via socket activation. The semantics are similar to the same option of StandardInput=.\n\nThe fd option connects the output stream to a single file descriptor provided by a socket unit. A custom named file descriptor can be specified as part of this option, after a \":\" (e.g. \"fd:foobar\"). If no name is specified, \"stdout\" is assumed (i.e. \"fd\" is equivalent to \"fd:stdout\"). At least one socket unit defining such name must be explicitly provided via the Sockets= option, and file descriptor name may differ from the name of its containing socket unit. If multiple matches are found, the first one will be used. See FileDescriptorName= in systemd.socket(5) for more details about named descriptors and ordering.\n\nIf the standard output (or error output, see below) of a unit is connected to the journal, syslog or the kernel log buffer, the unit will implicitly gain a dependency of type After= on systemd-journald.socket (also see the automatic dependencies section above).\n\nThis setting defaults to the value set with DefaultStandardOutput= in systemd-system.conf(5), which defaults to journal. Note that setting this parameter might result in additional dependencies to be added to the unit (see above)."
    },
    {
        "name": "StandardError",
        "choices": [],
        "doc": "Controls where file descriptor 2 (STDERR) of the executed processes is connected to. The available options are identical to those of StandardOutput=, with some exceptions: if set to inherit the file descriptor used for standard output is duplicated for standard error, while fd operates on the error stream and will look by default for a descriptor named \"stderr\".\n\nThis setting defaults to the value set with DefaultStandardError= in systemd-system.conf(5), which defaults to inherit. Note that setting this parameter might result in additional dependencies to be added to the unit (see above)."
    },
    {
        "name": "TTYPath",
        "choices": [],
        "doc": "Sets the terminal device node to use if standard input, output, or error are connected to a TTY (see above). Defaults to /dev/console."
    },
    {
        "name": "TTYReset",
        "choices": ["true", "false"],
        "doc": "Reset the terminal device specified with TTYPath= before and after execution. Defaults to \"no\"."
    },
    {
        "name": "TTYVHangup",
        "choices": [],
        "doc": "Disconnect all clients which have opened the terminal device specified with TTYPath= before and after execution. Defaults to \"no\"."
    },
    {
        "name": "TTYVTDisallocate",
        "choices": [],
        "doc": "If the terminal device specified with TTYPath= is a virtual console terminal, try to deallocate the TTY before and after execution. This ensures that the screen and scrollback buffer is cleared. Defaults to \"no\"."
    },
    {
        "name": "SyslogIdentifier",
        "choices": [],
        "doc": "Sets the process name to prefix log lines sent to the logging system or the kernel log buffer with. If not set, defaults to the process name of the executed process. This option is only useful when StandardOutput= or StandardError= are set to syslog, journal or kmsg (or to the same settings in combination with +console)."
    },
    {
        "name": "SyslogFacility",
        "choices": ["kern", "user", "mail", "daemon", "auth", "syslog", "lpr", "news", "uucp", "cron", "authpriv", "ftp", "local0", "local1", "local2", "local3", "local4", "local5", "local6", "local7"],
        "doc": "Sets the syslog facility to use when logging to syslog. One of kern, user, mail, daemon, auth, syslog, lpr, news, uucp, cron, authpriv, ftp, local0, local1, local2, local3, local4, local5, local6 or local7. See syslog(3) for details. This option is only useful when StandardOutput= or StandardError= are set to syslog. Defaults to daemon."
    },
    {
        "name": "SyslogLevel",
        "choices": ["emerg", "alert", "crit", "err", "warning", "notice", "info", "debug"],
        "doc": "The default syslog level to use when logging to syslog or the kernel log buffer. One of emerg, alert, crit, err, warning, notice, info, debug. See syslog(3) for details. This option is only useful when StandardOutput= or StandardError= are set to syslog or kmsg. Note that individual lines output by the daemon might be prefixed with a different log level which can be used to override the default log level specified here. The interpretation of these prefixes may be disabled with SyslogLevelPrefix=, see below. For details, see sd-daemon(3). Defaults to info."
    },
    {
        "name": "SyslogLevelPrefix",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If true and StandardOutput= or StandardError= are set to syslog, kmsg or journal, log lines written by the executed process that are prefixed with a log level will be passed on to syslog with this log level set but the prefix removed. If set to false, the interpretation of these prefixes is disabled and the logged lines are passed on as-is. For details about this prefixing see sd-daemon(3). Defaults to true."
    },
    {
        "name": "TimerSlackNSec",
        "choices": [],
        "doc": "Sets the timer slack in nanoseconds for the executed processes. The timer slack controls the accuracy of wake-ups triggered by timers. See prctl(2) for more information. Note that in contrast to most other time span definitions this parameter takes an integer value in nano-seconds if no unit is specified. The usual time units are understood too."
    },
    {
        "name": "LimitCPU",
        "choices": [],
        "doc": "Set soft and hard limits on various resources for executed processes. See setrlimit(2) for details on the resource limit concept. Resource limits may be specified in two formats: either as single value to set a specific soft and hard limit to the same value, or as colon-separated pair soft:hard to set both limits individually (e.g. \"LimitAS=4G:16G\"). Use the string infinity to configure no limit on a specific resource. The multiplicative suffixes K, M, G, T, P and E (to the base 1024) may be used for resource limits measured in bytes (e.g. LimitAS=16G). For the limits referring to time values, the usual time units ms, s, min, h and so on may be used (see systemd.time(7) for details). Note that if no time unit is specified for LimitCPU= the default unit of seconds is implied, while for LimitRTTIME= the default unit of microseconds is implied. Also, note that the effective granularity of the limits might influence their enforcement. For example, time limits specified for LimitCPU= will be rounded up implicitly to multiples of 1s. For LimitNICE= the value may be specified in two syntaxes: if prefixed with \"+\" or \"-\", the value is understood as regular Linux nice value in the range -20..19. If not prefixed like this the value is understood as raw resource limit parameter in the range 0..40 (with 0 being equivalent to 1).\n\nNote that most process resource limits configured with these options are per-process, and processes may fork in order to acquire a new set of resources that are accounted independently of the original process, and may thus escape limits set. Also note that LimitRSS= is not implemented on Linux, and setting it has no effect. Often it is advisable to prefer the resource controls listed in systemd.resource-control(5) over these per-process limits, as they apply to services as a whole, may be altered dynamically at runtime, and are generally more expressive. For example, MemoryLimit= is a more powerful (and working) replacement for LimitRSS=.\n\nFor system units these resource limits may be chosen freely. For user units however (i.e. units run by a per-user instance of systemd(1)), these limits are bound by (possibly more restrictive) per-user limits enforced by the OS.\n\nResource limits not configured explicitly for a unit default to the value configured in the various DefaultLimitCPU=, DefaultLimitFSIZE=, … options available in systemd-system.conf(5), and – if not configured there – the kernel or per-user defaults, as defined by the OS (the latter only for user services, see above).\n\nTable 1. Resource limit directives, their equivalent ulimit shell commands and the unit used\n\nDirective\tulimit equivalent\tUnit\nLimitCPU=\tulimit -t\tSeconds\nLimitFSIZE=\tulimit -f\tBytes\nLimitDATA=\tulimit -d\tBytes\nLimitSTACK=\tulimit -s\tBytes\nLimitCORE=\tulimit -c\tBytes\nLimitRSS=\tulimit -m\tBytes\nLimitNOFILE=\tulimit -n\tNumber of File Descriptors\nLimitAS=\tulimit -v\tBytes\nLimitNPROC=\tulimit -u\tNumber of Processes\nLimitMEMLOCK=\tulimit -l\tBytes\nLimitLOCKS=\tulimit -x\tNumber of Locks\nLimitSIGPENDING=\tulimit -i\tNumber of Queued Signals\nLimitMSGQUEUE=\tulimit -q\tBytes\nLimitNICE=\tulimit -e\tNice Level\nLimitRTPRIO=\tulimit -r\tRealtime Priority\nLimitRTTIME=\tNo equivalent\tMicroseconds"
    },
    {
        "name": "PAMName",
        "choices": [],
        "doc": "Sets the PAM service name to set up a session as. If set, the executed process will be registered as a PAM session under the specified service name. This is only useful in conjunction with the User= setting, and is otherwise ignored. If not set, no PAM session will be opened for the executed processes. See pam(8) for details.\n\nNote that for each unit making use of this option a PAM session handler process will be maintained as part of the unit and stays around as long as the unit is active, to ensure that appropriate actions can be taken when the unit and hence the PAM session terminates. This process is named \"(sd-pam)\" and is an immediate child process of the unit's main process."
    },
    {
        "name": "CapabilityBoundingSet",
        "choices": [],
        "doc": "Controls which capabilities to include in the capability bounding set for the executed process. See capabilities(7) for details. Takes a whitespace-separated list of capability names, e.g. CAP_SYS_ADMIN, CAP_DAC_OVERRIDE, CAP_SYS_PTRACE. Capabilities listed will be included in the bounding set, all others are removed. If the list of capabilities is prefixed with \"~\", all but the listed capabilities will be included, the effect of the assignment inverted. Note that this option also affects the respective capabilities in the effective, permitted and inheritable capability sets. If this option is not used, the capability bounding set is not modified on process execution, hence no limits on the capabilities of the process are enforced. This option may appear more than once, in which case the bounding sets are merged. If the empty string is assigned to this option, the bounding set is reset to the empty capability set, and all prior settings have no effect. If set to \"~\" (without any further argument), the bounding set is reset to the full set of available capabilities, also undoing any previous settings. This does not affect commands prefixed with \"+\"."
    },
    {
        "name": "AmbientCapabilities",
        "choices": [],
        "doc": "Controls which capabilities to include in the ambient capability set for the executed process. Takes a whitespace-separated list of capability names, e.g. CAP_SYS_ADMIN, CAP_DAC_OVERRIDE, CAP_SYS_PTRACE. This option may appear more than once in which case the ambient capability sets are merged. If the list of capabilities is prefixed with \"~\", all but the listed capabilities will be included, the effect of the assignment inverted. If the empty string is assigned to this option, the ambient capability set is reset to the empty capability set, and all prior settings have no effect. If set to \"~\" (without any further argument), the ambient capability set is reset to the full set of available capabilities, also undoing any previous settings. Note that adding capabilities to ambient capability set adds them to the process's inherited capability set.\n\nAmbient capability sets are useful if you want to execute a process as a non-privileged user but still want to give it some capabilities. Note that in this case option keep-caps is automatically added to SecureBits= to retain the capabilities over the user change. AmbientCapabilities= does not affect commands prefixed with \"+\"."
    },
    {
        "name": "SecureBits",
        "choices": ["keep-caps", "keep-caps-locked", "no-setuid-fixup", "no-setuid-fixup-locked", "noroot", "noroot-locked"],
        "doc": "Controls the secure bits set for the executed process. Takes a space-separated combination of options from the following list: keep-caps, keep-caps-locked, no-setuid-fixup, no-setuid-fixup-locked, noroot, and noroot-locked. This option may appear more than once, in which case the secure bits are ORed. If the empty string is assigned to this option, the bits are reset to 0. This does not affect commands prefixed with \"+\". See capabilities(7) for details."
    },
    {
        "name": "ReadWritePaths",
        "choices": [],
        "doc": "Sets up a new file system namespace for executed processes. These options may be used to limit access a process might have to the file system hierarchy. Each setting takes a space-separated list of paths relative to the host's root directory (i.e. the system running the service manager). Note that if paths contain symlinks, they are resolved relative to the root directory set with RootDirectory=/RootImage=.\n\nPaths listed in ReadWritePaths= are accessible from within the namespace with the same access modes as from outside of it. Paths listed in ReadOnlyPaths= are accessible for reading only, writing will be refused even if the usual file access controls would permit this. Nest ReadWritePaths= inside of ReadOnlyPaths= in order to provide writable subdirectories within read-only directories. Use ReadWritePaths= in order to whitelist specific paths for write access if ProtectSystem=strict is used. Paths listed in InaccessiblePaths= will be made inaccessible for processes inside the namespace (along with everything below them in the file system hierarchy).\n\nNote that restricting access with these options does not extend to submounts of a directory that are created later on. Non-directory paths may be specified as well. These options may be specified more than once, in which case all paths listed will have limited access from within the namespace. If the empty string is assigned to this option, the specific list is reset, and all prior assignments have no effect.\n\nPaths in ReadWritePaths=, ReadOnlyPaths= and InaccessiblePaths= may be prefixed with \"-\", in which case they will be ignored when they do not exist. If prefixed with \"+\" the paths are taken relative to the root directory of the unit, as configured with RootDirectory=/RootImage=, instead of relative to the root directory of the host (see above). When combining \"-\" and \"+\" on the same path make sure to specify \"-\" first, and \"+\" second.\n\nNote that using this setting will disconnect propagation of mounts from the service to the host (propagation in the opposite direction continues to work). This means that this setting may not be used for services which shall be able to install mount points in the main mount namespace. Note that the effect of these settings may be undone by privileged processes. In order to set up an effective sandboxed environment for a unit it is thus recommended to combine these settings with either CapabilityBoundingSet=~CAP_SYS_ADMIN or SystemCallFilter=~@mount."
    },
    {
        "name": "BindPaths",
        "choices": [],
        "doc": "Configures unit-specific bind mounts. A bind mount makes a particular file or directory available at an additional place in the unit's view of the file system. Any bind mounts created with this option are specific to the unit, and are not visible in the host's mount table. This option expects a whitespace separated list of bind mount definitions. Each definition consists of a colon-separated triple of source path, destination path and option string, where the latter two are optional. If only a source path is specified the source and destination is taken to be the same. The option string may be either \"rbind\" or \"norbind\" for configuring a recursive or non-recursive bind mount. If the destination path is omitted, the option string must be omitted too.\n\nBindPaths= creates regular writable bind mounts (unless the source file system mount is already marked read-only), while BindReadOnlyPaths= creates read-only bind mounts. These settings may be used more than once, each usage appends to the unit's list of bind mounts. If the empty string is assigned to either of these two options the entire list of bind mounts defined prior to this is reset. Note that in this case both read-only and regular bind mounts are reset, regardless which of the two settings is used.\n\nThis option is particularly useful when RootDirectory=/RootImage= is used. In this case the source path refers to a path on the host file system, while the destination path refers to a path below the root directory of the unit."
    },
    {
        "name": "PrivateTmp",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If true, sets up a new file system namespace for the executed processes and mounts private /tmp and /var/tmp directories inside it that is not shared by processes outside of the namespace. This is useful to secure access to temporary files of the process, but makes sharing between processes via /tmp or /var/tmp impossible. If this is enabled, all temporary files created by a service in these directories will be removed after the service is stopped. Defaults to false. It is possible to run two or more units within the same private /tmp and /var/tmp namespace by using the JoinsNamespaceOf= directive, see systemd.unit(5) for details. This setting is implied if DynamicUser= is set. For this setting the same restrictions regarding mount propagation and privileges apply as for ReadOnlyPaths= and related calls, see above. Enabling this setting has the side effect of adding Requires= and After= dependencies on all mount units necessary to access /tmp and /var/tmp. Moreover an implicitly After= ordering on systemd-tmpfiles-setup.service(8) is added."
    },
    {
        "name": "PrivateDevices",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If true, sets up a new /dev namespace for the executed processes and only adds API pseudo devices such as /dev/null, /dev/zero or /dev/random (as well as the pseudo TTY subsystem) to it, but no physical devices such as /dev/sda, system memory /dev/mem, system ports /dev/port and others. This is useful to securely turn off physical device access by the executed process. Defaults to false. Enabling this option will install a system call filter to block low-level I/O system calls that are grouped in the @raw-io set, will also remove CAP_MKNOD and CAP_SYS_RAWIO from the capability bounding set for the unit (see above), and set DevicePolicy=closed (see systemd.resource-control(5) for details). Note that using this setting will disconnect propagation of mounts from the service to the host (propagation in the opposite direction continues to work). This means that this setting may not be used for services which shall be able to install mount points in the main mount namespace. The /dev namespace will be mounted read-only and 'noexec'. The latter may break old programs which try to set up executable memory by using mmap(2) of /dev/zero instead of using MAP_ANON. This setting is implied if DynamicUser= is set. For this setting the same restrictions regarding mount propagation and privileges apply as for ReadOnlyPaths= and related calls, see above. If turned on and if running in user mode, or in system mode, but without the CAP_SYS_ADMIN capability (e.g. setting User=), NoNewPrivileges=yes is implied."
    },
    {
        "name": "PrivateNetwork",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If true, sets up a new network namespace for the executed processes and configures only the loopback network device \"lo\" inside it. No other network devices will be available to the executed process. This is useful to securely turn off network access by the executed process. Defaults to false. It is possible to run two or more units within the same private network namespace by using the JoinsNamespaceOf= directive, see systemd.unit(5) for details. Note that this option will disconnect all socket families from the host, this includes AF_NETLINK and AF_UNIX. The latter has the effect that AF_UNIX sockets in the abstract socket namespace will become unavailable to the processes (however, those located in the file system will continue to be accessible)."
    },
    {
        "name": "PrivateUsers",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If true, sets up a new user namespace for the executed processes and configures a minimal user and group mapping, that maps the \"root\" user and group as well as the unit's own user and group to themselves and everything else to the \"nobody\" user and group. This is useful to securely detach the user and group databases used by the unit from the rest of the system, and thus to create an effective sandbox environment. All files, directories, processes, IPC objects and other resources owned by users/groups not equaling \"root\" or the unit's own will stay visible from within the unit but appear owned by the \"nobody\" user and group. If this mode is enabled, all unit processes are run without privileges in the host user namespace (regardless if the unit's own user/group is \"root\" or not). Specifically this means that the process will have zero process capabilities on the host's user namespace, but full capabilities within the service's user namespace. Settings such as CapabilityBoundingSet= will affect only the latter, and there's no way to acquire additional capabilities in the host's user namespace. Defaults to off.\n\nThis setting is particularly useful in conjunction with RootDirectory=/RootImage=, as the need to synchronize the user and group databases in the root directory and on the host is reduced, as the only users and groups who need to be matched are \"root\", \"nobody\" and the unit's own user and group."
    },
    {
        "name": "ProtectSystem",
        "choices": ["true", "false", "full", "strict"],
        "doc": "Takes a boolean argument or the special values \"full\" or \"strict\". If true, mounts the /usr and /boot directories read-only for processes invoked by this unit. If set to \"full\", the /etc directory is mounted read-only, too. If set to \"strict\" the entire file system hierarchy is mounted read-only, except for the API file system subtrees /dev, /proc and /sys (protect these directories using PrivateDevices=, ProtectKernelTunables=, ProtectControlGroups=). This setting ensures that any modification of the vendor-supplied operating system (and optionally its configuration, and local mounts) is prohibited for the service. It is recommended to enable this setting for all long-running services, unless they are involved with system updates or need to modify the operating system in other ways. If this option is used, ReadWritePaths= may be used to exclude specific directories from being made read-only. This setting is implied if DynamicUser= is set. For this setting the same restrictions regarding mount propagation and privileges apply as for ReadOnlyPaths= and related calls, see above. Defaults to off."
    },
    {
        "name": "ProtectHome",
        "choices": ["true", "false", "read-only"],
        "doc": "Takes a boolean argument or \"read-only\". If true, the directories /home, /root and /run/user are made inaccessible and empty for processes invoked by this unit. If set to \"read-only\", the three directories are made read-only instead. It is recommended to enable this setting for all long-running services (in particular network-facing ones), to ensure they cannot get access to private user data, unless the services actually require access to the user's private data. This setting is implied if DynamicUser= is set. For this setting the same restrictions regarding mount propagation and privileges apply as for ReadOnlyPaths= and related calls, see above."
    },
    {
        "name": "ProtectKernelTunables",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If true, kernel variables accessible through /proc/sys, /sys, /proc/sysrq-trigger, /proc/latency_stats, /proc/acpi, /proc/timer_stats, /proc/fs and /proc/irq will be made read-only to all processes of the unit. Usually, tunable kernel variables should be initialized only at boot-time, for example with the sysctl.d(5) mechanism. Few services need to write to these at runtime; it is hence recommended to turn this on for most services. For this setting the same restrictions regarding mount propagation and privileges apply as for ReadOnlyPaths= and related calls, see above. Defaults to off. If turned on and if running in user mode, or in system mode, but without the CAP_SYS_ADMIN capability (e.g. services for which User= is set), NoNewPrivileges=yes is implied. Note that this option does not prevent indirect changes to kernel tunables effected by IPC calls to other processes. However, InaccessiblePaths= may be used to make relevant IPC file system objects inaccessible. If ProtectKernelTunables= is set, MountAPIVFS=yes is implied."
    },
    {
        "name": "ProtectKernelModules",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If true, explicit module loading will be denied. This allows to turn off module load and unload operations on modular kernels. It is recommended to turn this on for most services that do not need special file systems or extra kernel modules to work. Default to off. Enabling this option removes CAP_SYS_MODULE from the capability bounding set for the unit, and installs a system call filter to block module system calls, also /usr/lib/modules is made inaccessible. For this setting the same restrictions regarding mount propagation and privileges apply as for ReadOnlyPaths= and related calls, see above. Note that limited automatic module loading due to user configuration or kernel mapping tables might still happen as side effect of requested user operations, both privileged and unprivileged. To disable module auto-load feature please see sysctl.d(5) kernel.modules_disabled mechanism and /proc/sys/kernel/modules_disabled documentation. If turned on and if running in user mode, or in system mode, but without the CAP_SYS_ADMIN capability (e.g. setting User=), NoNewPrivileges=yes is implied."
    },
    {
        "name": "ProtectControlGroups",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If true, the Linux Control Groups (cgroups(7)) hierarchies accessible through /sys/fs/cgroup will be made read-only to all processes of the unit. Except for container managers no services should require write access to the control groups hierarchies; it is hence recommended to turn this on for most services. For this setting the same restrictions regarding mount propagation and privileges apply as for ReadOnlyPaths= and related calls, see above. Defaults to off. If ProtectControlGroups= is set, MountAPIVFS=yes is implied."
    },
    {
        "name": "MountFlags",
        "choices": ["shared", "slave", "private"],
        "doc": "Takes a mount propagation flag: shared, slave or private, which control whether mounts in the file system namespace set up for this unit's processes will receive or propagate mounts and unmounts. See mount(2) for details. Defaults to shared. Use shared to ensure that mounts and unmounts are propagated from systemd's namespace to the service's namespace and vice versa. Use slave to run processes so that none of their mounts and unmounts will propagate to the host. Use private to also ensure that no mounts and unmounts from the host will propagate into the unit processes' namespace. If this is set to slave or private, any mounts created by spawned processes will be unmounted after the completion of the current command line of ExecStartPre=, ExecStartPost=, ExecStart=, and ExecStopPost=. Note that slave means that file systems mounted on the host might stay mounted continuously in the unit's namespace, and thus keep the device busy. Note that the file system namespace related options (PrivateTmp=, PrivateDevices=, ProtectSystem=, ProtectHome=, ProtectKernelTunables=, ProtectControlGroups=, ReadOnlyPaths=, InaccessiblePaths=, ReadWritePaths=) require that mount and unmount propagation from the unit's file system namespace is disabled, and hence downgrade shared to slave."
    },
    {
        "name": "UtmpIdentifier",
        "choices": [],
        "doc": "Takes a four character identifier string for an utmp(5) and wtmp entry for this service. This should only be set for services such as getty implementations (such as agetty(8)) where utmp/wtmp entries must be created and cleared before and after execution, or for services that shall be executed as if they were run by a getty process (see below). If the configured string is longer than four characters, it is truncated and the terminal four characters are used. This setting interprets %I style string replacements. This setting is unset by default, i.e. no utmp/wtmp entries are created or cleaned up for this service."
    },
    {
        "name": "UtmpMode",
        "choices": ["init", "login", "user"],
        "doc": "Takes one of \"init\", \"login\" or \"user\". If UtmpIdentifier= is set, controls which type of utmp(5)/wtmp entries for this service are generated. This setting has no effect unless UtmpIdentifier= is set too. If \"init\" is set, only an INIT_PROCESS entry is generated and the invoked process must implement a getty-compatible utmp/wtmp logic. If \"login\" is set, first an INIT_PROCESS entry, followed by a LOGIN_PROCESS entry is generated. In this case, the invoked process must implement a login(1)-compatible utmp/wtmp logic. If \"user\" is set, first an INIT_PROCESS entry, then a LOGIN_PROCESS entry and finally a USER_PROCESS entry is generated. In this case, the invoked process may be any process that is suitable to be run as session leader. Defaults to \"init\"."
    },
    {
        "name": "SELinuxContext",
        "choices": [],
        "doc": "Set the SELinux security context of the executed process. If set, this will override the automated domain transition. However, the policy still needs to authorize the transition. This directive is ignored if SELinux is disabled. If prefixed by \"-\", all errors will be ignored. This does not affect commands prefixed with \"+\". See setexeccon(3) for details."
    },
    {
        "name": "AppArmorProfile",
        "choices": [],
        "doc": "Takes a profile name as argument. The process executed by the unit will switch to this profile when started. Profiles must already be loaded in the kernel, or the unit will fail. This result in a non operation if AppArmor is not enabled. If prefixed by \"-\", all errors will be ignored. This does not affect commands prefixed with \"+\"."
    },
    {
        "name": "SmackProcessLabel",
        "choices": [],
        "doc": "Takes a SMACK64 security label as argument. The process executed by the unit will be started under this label and SMACK will decide whether the process is allowed to run or not, based on it. The process will continue to run under the label specified here unless the executable has its own SMACK64EXEC label, in which case the process will transition to run under that label. When not specified, the label that systemd is running under is used. This directive is ignored if SMACK is disabled.\n\nThe value may be prefixed by \"-\", in which case all errors will be ignored. An empty value may be specified to unset previous assignments. This does not affect commands prefixed with \"+\"."
    },
    {
        "name": "IgnoreSIGPIPE",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If true, causes SIGPIPE to be ignored in the executed process. Defaults to true because SIGPIPE generally is useful only in shell pipelines."
    },
    {
        "name": "NoNewPrivileges",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If true, ensures that the service process and all its children can never gain new privileges through execve() (e.g. via setuid or setgid bits, or filesystem capabilities). This is the simplest and most effective way to ensure that a process and its children can never elevate privileges again. Defaults to false, but certain settings force NoNewPrivileges=yes, ignoring the value of this setting. This is the case when SystemCallFilter=, SystemCallArchitectures=, RestrictAddressFamilies=, RestrictNamespaces=, PrivateDevices=, ProtectKernelTunables=, ProtectKernelModules=, MemoryDenyWriteExecute=, or RestrictRealtime= are specified."
    },
    {
        "name": "SystemCallFilter",
        "choices": [],
        "doc": "Takes a space-separated list of system call names. If this setting is used, all system calls executed by the unit processes except for the listed ones will result in immediate process termination with the SIGSYS signal (whitelisting). If the first character of the list is \"~\", the effect is inverted: only the listed system calls will result in immediate process termination (blacklisting). If running in user mode, or in system mode, but without the CAP_SYS_ADMIN capability (e.g. setting User=nobody), NoNewPrivileges=yes is implied. This feature makes use of the Secure Computing Mode 2 interfaces of the kernel ('seccomp filtering') and is useful for enforcing a minimal sandboxing environment. Note that the execve, exit, exit_group, getrlimit, rt_sigreturn, sigreturn system calls and the system calls for querying time and sleeping are implicitly whitelisted and do not need to be listed explicitly. This option may be specified more than once, in which case the filter masks are merged. If the empty string is assigned, the filter is reset, all prior assignments will have no effect. This does not affect commands prefixed with \"+\".\n\nNote that on systems supporting multiple ABIs (such as x86/x86-64) it is recommended to turn off alternative ABIs for services, so that they cannot be used to circumvent the restrictions of this option. Specifically, it is recommended to combine this option with SystemCallArchitectures=native or similar.\n\nNote that strict system call filters may impact execution and error handling code paths of the service invocation. Specifically, access to the execve system call is required for the execution of the service binary — if it is blocked service invocation will necessarily fail. Also, if execution of the service binary fails for some reason (for example: missing service executable), the error handling logic might require access to an additional set of system calls in order to process and log this failure correctly. It might be necessary to temporarily disable system call filters in order to simplify debugging of such failures.\n\nIf you specify both types of this option (i.e. whitelisting and blacklisting), the first encountered will take precedence and will dictate the default action (termination or approval of a system call). Then the next occurrences of this option will add or delete the listed system calls from the set of the filtered system calls, depending of its type and the default action. (For example, if you have started with a whitelisting of read and write, and right after it add a blacklisting of write, then write will be removed from the set.)\n\nAs the number of possible system calls is large, predefined sets of system calls are provided. A set starts with \"@\" character, followed by name of the set.\n\nTable 2. Currently predefined system call sets\n\nSet\tDescription\n@basic-io\tSystem calls for basic I/O: reading, writing, seeking, file descriptor duplication and closing (read(2), write(2), and related calls)\n@clock\tSystem calls for changing the system clock (adjtimex(2), settimeofday(2), and related calls)\n@cpu-emulation\tSystem calls for CPU emulation functionality (vm86(2) and related calls)\n@debug\tDebugging, performance monitoring and tracing functionality (ptrace(2), perf_event_open(2) and related calls)\n@file-system\tFile system operations: opening, creating files and directories for read and write, renaming and removing them, reading file properties, or creating hard and symbolic links.\n@io-event\tEvent loop system calls (poll(2), select(2), epoll(7), eventfd(2) and related calls)\n@ipc\tPipes, SysV IPC, POSIX Message Queues and other IPC (mq_overview(7), svipc(7))\n@keyring\tKernel keyring access (keyctl(2) and related calls)\n@module\tLoading and unloading of kernel modules (init_module(2), delete_module(2) and related calls)\n@mount\tMounting and unmounting of file systems (mount(2), chroot(2), and related calls)\n@network-io\tSocket I/O (including local AF_UNIX): socket(7), unix(7)\n@obsolete\tUnusual, obsolete or unimplemented (create_module(2), gtty(2), …)\n@privileged\tAll system calls which need super-user capabilities (capabilities(7))\n@process\tProcess control, execution, namespaceing operations (clone(2), kill(2), namespaces(7), …\n@raw-io\tRaw I/O port access (ioperm(2), iopl(2), pciconfig_read(), …)\n@reboot\tSystem calls for rebooting and reboot preparation (reboot(2), kexec(), …)\n@resources\tSystem calls for changing resource limits, memory and scheduling parameters (setrlimit(2), setpriority(2), …)\n@swap\tSystem calls for enabling/disabling swap devices (swapon(2), swapoff(2))\n\nNote, that as new system calls are added to the kernel, additional system calls might be added to the groups above. Contents of the sets may also change between systemd versions. In addition, the list of system calls depends on the kernel version and architecture for which systemd was compiled. Use systemd-analyze syscall-filter to list the actual list of system calls in each filter.\n\nIt is recommended to combine the file system namespacing related options with SystemCallFilter=~@mount, in order to prohibit the unit's processes to undo the mappings. Specifically these are the options PrivateTmp=, PrivateDevices=, ProtectSystem=, ProtectHome=, ProtectKernelTunables=, ProtectControlGroups=, ReadOnlyPaths=, InaccessiblePaths= and ReadWritePaths=."
    },
    {
        "name": "SystemCallErrorNumber",
        "choices": [],
        "doc": "Takes an \"errno\" error number name to return when the system call filter configured with SystemCallFilter= is triggered, instead of terminating the process immediately. Takes an error name such as EPERM, EACCES or EUCLEAN. When this setting is not used, or when the empty string is assigned, the process will be terminated immediately when the filter is triggered."
    },
    {
        "name": "SystemCallArchitectures",
        "choices": ["x86", "x86-64", "ppc", "ppc-le", "ppc64", "ppc64-le", "ia64", "parisc", "parisc64", "s390", "s390x", "sparc", "sparc64", "mips", "mips-le", "mips64", "mips64-le", "alpha", "arm", "arm-be", "arm64", "arm64-be", "sh", "sh64", "m86k", "tilegx", "cris", "x32", "mips64-n32", "mips64-le-n32", "native"],
        "doc": "Takes a space-separated list of architecture identifiers to include in the system call filter. The known architecture identifiers are the same as for ConditionArchitecture= described in systemd.unit(5), as well as x32, mips64-n32, mips64-le-n32, and the special identifier native. Only system calls of the specified architectures will be permitted to processes of this unit. This is an effective way to disable compatibility with non-native architectures for processes, for example to prohibit execution of 32-bit x86 binaries on 64-bit x86-64 systems. The special native identifier implicitly maps to the native architecture of the system (or more strictly: to the architecture the system manager is compiled for). If running in user mode, or in system mode, but without the CAP_SYS_ADMIN capability (e.g. setting User=nobody), NoNewPrivileges=yes is implied. Note that setting this option to a non-empty list implies that native is included too. By default, this option is set to the empty list, i.e. no system call architecture filtering is applied.\n\nNote that system call filtering is not equally effective on all architectures. For example, on x86 filtering of network socket-related calls is not possible, due to ABI limitations — a limitation that x86-64 does not have, however. On systems supporting multiple ABIs at the same time — such as x86/x86-64 — it is hence recommended to limit the set of permitted system call architectures so that secondary ABIs may not be used to circumvent the restrictions applied to the native ABI of the system. In particular, setting SystemCallFilter=native is a good choice for disabling non-native ABIs.\n\nSystem call architectures may also be restricted system-wide via the SystemCallArchitectures= option in the global configuration. See systemd-system.conf(5) for details."
    },
    {
        "name": "RestrictAddressFamilies",
        "choices": [],
        "doc": "Restricts the set of socket address families accessible to the processes of this unit. Takes a space-separated list of address family names to whitelist, such as AF_UNIX, AF_INET or AF_INET6. When prefixed with ~ the listed address families will be applied as blacklist, otherwise as whitelist. Note that this restricts access to the socket(2) system call only. Sockets passed into the process by other means (for example, by using socket activation with socket units, see systemd.socket(5)) are unaffected. Also, sockets created with socketpair() (which creates connected AF_UNIX sockets only) are unaffected. Note that this option has no effect on 32-bit x86, s390, s390x, mips, mips-le, ppc, ppc-le, pcc64, ppc64-le and is ignored (but works correctly on other ABIs, including x86-64). Note that on systems supporting multiple ABIs (such as x86/x86-64) it is recommended to turn off alternative ABIs for services, so that they cannot be used to circumvent the restrictions of this option. Specifically, it is recommended to combine this option with SystemCallArchitectures=native or similar. If running in user mode, or in system mode, but without the CAP_SYS_ADMIN capability (e.g. setting User=nobody), NoNewPrivileges=yes is implied. By default, no restrictions apply, all address families are accessible to processes. If assigned the empty string, any previous address familiy restriction changes are undone. This setting does not affect commands prefixed with \"+\".\n\nUse this option to limit exposure of processes to remote access, in particular via exotic and sensitive network protocols, such as AF_PACKET. Note that in most cases, the local AF_UNIX address family should be included in the configured whitelist as it is frequently used for local communication, including for syslog(2) logging."
    },
    {
        "name": "RestrictNamespaces",
        "choices": [],
        "doc": "Restricts access to Linux namespace functionality for the processes of this unit. For details about Linux namespaces, see namespaces(7). Either takes a boolean argument, or a space-separated list of namespace type identifiers. If false (the default), no restrictions on namespace creation and switching are made. If true, access to any kind of namespacing is prohibited. Otherwise, a space-separated list of namespace type identifiers must be specified, consisting of any combination of: cgroup, ipc, net, mnt, pid, user and uts. Any namespace type listed is made accessible to the unit's processes, access to namespace types not listed is prohibited (whitelisting). By prepending the list with a single tilda character (\"~\") the effect may be inverted: only the listed namespace types will be made inaccessible, all unlisted ones are permitted (blacklisting). If the empty string is assigned, the default namespace restrictions are applied, which is equivalent to false. Internally, this setting limits access to the unshare(2), clone(2) and setns(2) system calls, taking the specified flags parameters into account. Note that — if this option is used — in addition to restricting creation and switching of the specified types of namespaces (or all of them, if true) access to the setns() system call with a zero flags parameter is prohibited. This setting is only supported on x86, x86-64, s390 and s390x, and enforces no restrictions on other architectures. If running in user mode, or in system mode, but without the CAP_SYS_ADMIN capability (e.g. setting User=), NoNewPrivileges=yes is implied."
    },
    {
        "name": "Personality",
        "choices": ["x86"," x86-64", "ppc", "ppc-le", "ppc64", "ppc64-le", "s390", "s390x"],
        "doc": "Controls which kernel architecture uname(2) shall report, when invoked by unit processes. Takes one of the architecture identifiers x86, x86-64, ppc, ppc-le, ppc64, ppc64-le, s390 or s390x. Which personality architectures are supported depends on the system architecture. Usually the 64bit versions of the various system architectures support their immediate 32bit personality architecture counterpart, but no others. For example, x86-64 systems support the x86-64 and x86 personalities but no others. The personality feature is useful when running 32-bit services on a 64-bit host system. If not specified, the personality is left unmodified and thus reflects the personality of the host system's kernel."
    },
    {
        "name": "RuntimeDirectory",
        "choices": [],
        "doc": "Takes a list of directory names. If set, one or more directories by the specified names will be created below /run (for system services) or below $XDG_RUNTIME_DIR (for user services) when the unit is started, and removed when the unit is stopped. The directories will have the access mode specified in RuntimeDirectoryMode=, and will be owned by the user and group specified in User= and Group=. Use this to manage one or more runtime directories of the unit and bind their lifetime to the daemon runtime. The specified directory names must be relative, and may not include a \"/\", i.e. must refer to simple directories to create or remove. This is particularly useful for unprivileged daemons that cannot create runtime directories in /run due to lack of privileges, and to make sure the runtime directory is cleaned up automatically after use. For runtime directories that require more complex or different configuration or lifetime guarantees, please consider using tmpfiles.d(5)."
    },
    {
        "name": "MemoryDenyWriteExecute",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If set, attempts to create memory mappings that are writable and executable at the same time, or to change existing memory mappings to become executable, or mapping shared memory segments as executable are prohibited. Specifically, a system call filter is added that rejects mmap(2) system calls with both PROT_EXEC and PROT_WRITE set, mprotect(2) system calls with PROT_EXEC set and shmat(2) system calls with SHM_EXEC set. Note that this option is incompatible with programs that generate program code dynamically at runtime, such as JIT execution engines, or programs compiled making use of the code \"trampoline\" feature of various C compilers. This option improves service security, as it makes harder for software exploits to change running code dynamically. Note that this feature is fully available on x86-64, and partially on x86. Specifically, the shmat() protection is not available on x86. Note that on systems supporting multiple ABIs (such as x86/x86-64) it is recommended to turn off alternative ABIs for services, so that they cannot be used to circumvent the restrictions of this option. Specifically, it is recommended to combine this option with SystemCallArchitectures=native or similar. If running in user mode, or in system mode, but without the CAP_SYS_ADMIN capability (e.g. setting User=), NoNewPrivileges=yes is implied."
    },
    {
        "name": "RestrictRealtime",
        "choices": ["true", "false"],
        "doc": "Takes a boolean argument. If set, any attempts to enable realtime scheduling in a process of the unit are refused. This restricts access to realtime task scheduling policies such as SCHED_FIFO, SCHED_RR or SCHED_DEADLINE. See sched(7) for details about these scheduling policies. If running in user mode, or in system mode, but without the CAP_SYS_ADMIN capability (e.g. setting User=), NoNewPrivileges=yes is implied. Realtime scheduling policies may be used to monopolize CPU time for longer periods of time, and may hence be used to lock up or otherwise trigger Denial-of-Service situations on the system. It is hence recommended to restrict access to realtime scheduling to the few programs that actually require them. Defaults to off."
    }
]);

export var completionMetadata: List<SectionInfo> = List([
    {
        name: "Unit",
        fileMatch: /.+/,
        doc: "A unit configuration file encodes information about a service, a socket, a device, a mount point, an automount point, a swap file or partition, a start-up target, a watched file system path, a timer controlled and supervised by systemd, a resource management slice or a group of externally created processes.",
        settings: List<SettingInfo>([
            {
                name: "Description",
                choices: [],
                doc: "A free-form string describing the unit. This is intended for use in UIs to show descriptive information along with the unit name."
            },
            {
                name: "Requires",
                choices: [],
                doc: "Configures requirement dependencies on other units. If this unit gets activated, the units listed here will be activated as well. If one of the other units gets deactivated or its activation fails, this unit will be deactivated."
            },
            {
                name: "Requisite",
                choices: [],
                doc: "Similar to Requires. However, if the units listed here are not started already, they will not be started and the transaction will fail immediately."
            },
            {
                name: "Wants",
                choices: [],
                doc: "A weaker version of Requires=. Units listed in this option will be started if the configuring unit is. However, if the listed units fail to start or cannot be added to the transaction, this has no impact on the validity of the transaction as a whole. This is the recommended way to hook start-up of one unit to the start-up of another unit."
            },
            {
                name: "BindsTo",
                choices: [],
                doc: "Configures requirement dependencies, very similar in style to Requires=. However, this dependency type is stronger: in addition to the effect of Requires= it declares that if the unit bound to is stopped, this unit will be stopped too. This means a unit bound to another unit that suddenly enters inactive state will be stopped too. Units can suddenly, unexpectedly enter inactive state for different reasons: the main process of a service unit might terminate on its own choice, the backing device of a device unit might be unplugged or the mount point of a mount unit might be unmounted without involvement of the system and service manager."
            },
            {
                name: "PartOf",
                choices: [],
                doc: "Configures dependencies similar to Requires=, but limited to stopping and restarting of units. When systemd stops or restarts the units listed here, the action is propagated to this unit. Note that this is a one-way dependency — changes to this unit do not affect the listed units."
            },
            {
                name: "Conflicts",
                choices: [],
                doc: "A space-separated list of unit names. Configures negative requirement dependencies. If a unit has a Conflicts= setting on another unit, starting the former will stop the latter and vice versa. Note that this setting is independent of and orthogonal to the After= and Before= ordering dependencies."
            },
            {
                name: "Before",
                choices: [],
                doc: "A space-separated list of unit names. Configures ordering dependencies between units. If a unit foo.service contains a setting Before=bar.service and both units are being started, bar.service's start-up is delayed until foo.service is started up. Note that this setting is independent of and orthogonal to the requirement dependencies as configured by Requires=, Wants= or BindsTo=. It is a common pattern to include a unit name in both the After= and Requires= option, in which case the unit listed will be started before the unit that is configured with these options. This option may be specified more than once, in which case ordering dependencies for all listed names are created."
            },
            {
                name: "After",
                choices: [],
                doc: "A space-separated list of unit names. Configures ordering dependencies between units. If a unit foo.service contains a setting Before=bar.service and both units are being started, bar.service's start-up is delayed until foo.service is started up. Note that this setting is independent of and orthogonal to the requirement dependencies as configured by Requires=, Wants= or BindsTo=. It is a common pattern to include a unit name in both the After= and Requires= option, in which case the unit listed will be started before the unit that is configured with these options. This option may be specified more than once, in which case ordering dependencies for all listed names are created."
            },
            {
                name: "OnFailure",
                choices: [],
                doc: "A space-separated list of one or more units that are activated when this unit enters the \"failed\" state."
            },
            {
                name: "PropagatesReloadTo",
                choices: [],
                doc: "A space-separated list of one or more units where reload requests on this unit will be propagated to, or reload requests on the other unit will be propagated to this unit, respectively. Issuing a reload request on a unit will automatically also enqueue a reload request on all units that the reload request shall be propagated to via these two settings."
            },
            {
                name: "ReloadPropagatedFrom",
                choices: [],
                doc: "A space-separated list of one or more units where reload requests on this unit will be propagated to, or reload requests on the other unit will be propagated to this unit, respectively. Issuing a reload request on a unit will automatically also enqueue a reload request on all units that the reload request shall be propagated to via these two settings."
            },
            {
                name: "JoinsNamespaceOf",
                choices: [],
                doc: "For units that start processes (such as service units), lists one or more other units whose network and/or temporary file namespace to join. This only applies to unit types which support the PrivateNetwork= and PrivateTmp= directives (see systemd.exec(5) for details). If a unit that has this setting set is started, its processes will see the same /tmp, /var/tmp and network namespace as one listed unit that is started. If multiple listed units are already started, it is not defined which namespace is joined. Note that this setting only has an effect if PrivateNetwork= and/or PrivateTmp= is enabled for both the unit that joins the namespace and the unit whose namespace is joined."
            },
            {
                name: "RequiresMountsFor",
                choices: [],
                doc: "Takes a space-separated list of absolute paths. Automatically adds dependencies of type Requires= and After= for all mount units required to access the specified path."
            },
            {
                name: "OnFailureJobMode",
                choices: ["fail", "replace", "replace-irreversibly", "isolate", "flush", "ignore-dependencies", "ignore-requirements"],
                doc: 'Specifies how the units listed in OnFailure= will be enqueued. See systemctl(1)\'s --job-mode= option for details on the possible values. If this is set to "isolate", only a single unit may be listed in OnFailure=. Defaults to "replace".'
            },
            {
                name: "IgnoreOnIsolate",
                choices: ["true", "false"],
                doc: "If true, this unit will not be stopped when isolating another unit. Defaults to false. Takes a boolean argument."
            },
            {
                name: "StopWhenUnneeded",
                choices: ["true", "false"],
                doc: "If true, this unit will be stopped when it is no longer used. Note that, in order to minimize the work to be executed, systemd will not stop units by default unless they are conflicting with other units, or the user explicitly requested their shut down. If this option is set, a unit will be automatically cleaned up if no other active unit requires it. Defaults to false."
            },
            {
                name: "RefuseManualStart",
                choices: ["true", "false"],
                doc: "If true, this unit can only be activated or deactivated indirectly. In this case, explicit start-up or termination requested by the user is denied, however if it is started or stopped as a dependency of another unit, start-up or termination will succeed. This is mostly a safety feature to ensure that the user does not accidentally activate units that are not intended to be activated explicitly, and not accidentally deactivate units that are not intended to be deactivated. These options default to false."
            },
            {
                name: "RefuseManualStop",
                choices: ["true", "false"],
                doc: "Takes a boolean argument. If true, this unit can only be activated or deactivated indirectly. In this case, explicit start-up or termination requested by the user is denied, however if it is started or stopped as a dependency of another unit, start-up or termination will succeed. This is mostly a safety feature to ensure that the user does not accidentally activate units that are not intended to be activated explicitly, and not accidentally deactivate units that are not intended to be deactivated. These options default to false."
            },
            {
                name: "AllowIsolate",
                choices: ["true", "false"],
                doc: "If true, this unit may be used with the systemctl isolate command. Otherwise, this will be refused. It probably is a good idea to leave this disabled except for target units that shall be used similar to runlevels in SysV init systems, just as a precaution to avoid unusable system states. This option defaults to false."
            },
            {
                name: "DefaultDependencies",
                choices: ["true", "false"],
                doc: "If true, (the default), a few default dependencies will implicitly be created for the unit. The actual dependencies created depend on the unit type. For example, for service units, these dependencies ensure that the service is started only after basic system initialization is completed and is properly terminated on system shutdown. See the respective man pages for details. Generally, only services involved with early boot or late shutdown should set this option to false. It is highly recommended to leave this option enabled for the majority of common units. If set to false, this option does not disable all implicit dependencies, just non-essential ones."
            },
            {
                name: "JobTimeoutSec",
                choices: ["true", "false"],
                doc: "If true, (the default), a few default dependencies will implicitly be created for the unit. The actual dependencies created depend on the unit type. For example, for service units, these dependencies ensure that the service is started only after basic system initialization is completed and is properly terminated on system shutdown. See the respective man pages for details. Generally, only services involved with early boot or late shutdown should set this option to false. It is highly recommended to leave this option enabled for the majority of common units. If set to false, this option does not disable all implicit dependencies, just non-essential ones."
            },
            {
                name: "JobTimeoutAction",
                choices: ["true", "false"],
                doc: "Takes a boolean argument. If true, (the default), a few default dependencies will implicitly be created for the unit. The actual dependencies created depend on the unit type. For example, for service units, these dependencies ensure that the service is started only after basic system initialization is completed and is properly terminated on system shutdown. See the respective man pages for details. Generally, only services involved with early boot or late shutdown should set this option to false. It is highly recommended to leave this option enabled for the majority of common units. If set to false, this option does not disable all implicit dependencies, just non-essential ones."
            },
            {
                name: "JobTimeoutRebootArgument",
                choices: ["true", "false"],
                doc: "If true, (the default), a few default dependencies will implicitly be created for the unit. The actual dependencies created depend on the unit type. For example, for service units, these dependencies ensure that the service is started only after basic system initialization is completed and is properly terminated on system shutdown. See the respective man pages for details. Generally, only services involved with early boot or late shutdown should set this option to false. It is highly recommended to leave this option enabled for the majority of common units. If set to false, this option does not disable all implicit dependencies, just non-essential ones."
            },
            {
                name: "StartLimitIntervalSec",
                choices: [],
                doc: "Configure unit start rate limiting. Configures the checking interval (defaults to DefaultStartLimitIntervalSec= in manager configuration file, set to 0 to disable any kind of rate limiting)."
            },
            {
                name: "StartLimitBurst",
                choices: [],
                doc: "Configures unit start rate limiting. StartLimitBurst= specifies how many starts per interval are allowed (defaults to DefaultStartLimitBurst= in manager configuration file)."
            },
            {
                name: "StartLimitAction",
                choices: ["none", "reboot", "reboot-force", "reboot-immediate", "poweroff", "poweroff-force", "poweroff-immediate"],
                doc: "Configure unit start rate limiting. Specifies how many starts per interval are allowed (defaults to DefaultStartLimitBurst= in manager configuration file)."
            },
            {
                name: "RebootArgument",
                choices: [],
                doc: "Configure the optional argument for the reboot(2) system call if StartLimitAction= or a service's FailureAction= is a reboot action. This works just like the optional argument to systemctl reboot command."
            },
            {
                name: "ConditionArchitecture",
                choices: ["x86", "x86-64", "ppc", "ppc-le", "ppc64", "ppc64-le", "ia64", "parisc", "parisc64", "s390", "s390x", "sparc", "sparc64", "mips", "mips-le", "mips64", "mips64-le", "alpha", "arm", "arm-be", "arm64", "arm64-be", "sh", "sh64", "m86k", "tilegx", "cris"],
                doc: "ConditionArchitecture= may be used to check whether the system is running on a specific architecture. Takes one of x86, x86-64, ppc, ppc-le, ppc64, ppc64-le, ia64, parisc, parisc64, s390, s390x, sparc, sparc64, mips, mips-le, mips64, mips64-le, alpha, arm, arm-be, arm64, arm64-be, sh, sh64, m86k, tilegx, cris to test against a specific architecture. The architecture is determined from the information returned by uname(2) and is thus subject to personality(2). Note that a Personality= setting in the same unit file has no effect on this condition. A special architecture name native is mapped to the architecture the system manager itself is compiled for. The test may be negated by prepending an exclamation mark."
            },
            {
                name: "ConditionVirtualization",
                choices: ["qemu", "kvm", "zvm", "vmware", "microsoft", "oracle", "xen", "bochs", "uml", "openvz", "lxc", "lxc-libvirt", "systemd-nspawn", "docker", "rkt"],
                doc: "ConditionVirtualization= may be used to check whether the system is executed in a virtualized environment and optionally test whether it is a specific implementation. Takes either boolean value to check if being executed in any virtualized environment, or one of vm and container to test against a generic type of virtualization solution, or one of qemu, kvm, zvm, vmware, microsoft, oracle, xen, bochs, uml, openvz, lxc, lxc-libvirt, systemd-nspawn, docker, rkt to test against a specific implementation, or private-users to check whether we are running in a user namespace. See systemd-detect-virt(1) for a full list of known virtualization technologies and their identifiers. If multiple virtualization technologies are nested, only the innermost is considered. The test may be negated by prepending an exclamation mark."
            },
            {
                name: "ConditionHost",
                choices: [],
                doc: "ConditionHost= may be used to match against the hostname or machine ID of the host. This either takes a hostname string (optionally with shell style globs) which is tested against the locally set hostname as returned by gethostname(2), or a machine ID formatted as string (see machine-id(5)). The test may be negated by prepending an exclamation mark."
            },
            {
                name: "ConditionKernelCommandLine",
                choices: [],
                doc: "Checks whether a specific kernel command line option is set (or if prefixed with the exclamation mark unset). The argument must either be a single word, or an assignment (i.e. two words, separated \"=\"). In the former case the kernel command line is searched for the word appearing as is, or as left hand side of an assignment. In the latter case, the exact assignment is looked for with right and left hand side matching."
            },
            {
                name: "ConditionSecurity",
                choices: ["selinux", "apparmor", "ima", "smack", "audit"],
                doc: "Checks whether the given security module is enabled on the system. Currently, the recognized values are selinux, apparmor, ima, smack and audit. The test may be negated by prepending an exclamation mark."
            },
            {
                name: "ConditionCapability",
                choices: [],
                doc: "Checks whether the given capability exists in the capability bounding set of the service manager (i.e. this does not check whether capability is actually available in the permitted or effective sets, see capabilities(7) for details). Pass a capability name such as \"CAP_MKNOD\", possibly prefixed with an exclamation mark to negate the check."
            },
            {
                name: "ConditionACPower",
                choices: ["true", "false"],
                doc: "ConditionACPower= may be used to check whether the system has AC power, or is exclusively battery powered at the time of activation of the unit. This takes a boolean argument. If set to true, the condition will hold only if at least one AC connector of the system is connected to a power source, or if no AC connectors are known. Conversely, if set to false, the condition will hold only if there is at least one AC connector known and all AC connectors are disconnected from a power source."
            },
            {
                name: "ConditionNeedsUpdate",
                choices: ["/var", "/etc", "!/var", "!/etc"],
                doc: "Checks whether the specified directory requires an update because /usr's modification time is newer than the stamp file .updated in the specified directory. This is useful to implement offline updates of the vendor operating system resources in /usr that require updating of /etc or /var on the next following boot. Units making use of this condition should order themselves before systemd-update-done.service(8), to make sure they run before the stamp file's modification time gets reset indicating a completed update. Takes one of /var or /etc as argument, possibly prefixed with a \"!\" (for inverting the condition)."
            },
            {
                name: "ConditionFirstBoot",
                choices: ["true", "false"],
                doc: "Checks whether the system is booting up with an unpopulated /etc directory. This may be used to populate /etc on the first boot after factory reset, or when a new system instances boots up for the first time."
            },
            {
                name: "ConditionPathExists",
                choices: [],
                doc: "Checks whether a file exists before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to ConditionPathExists= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "ConditionPathExistsGlob",
                choices: [],
                doc: "Verifies the existence of at least one file or directory matching the specified globbing pattern before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to ConditionPathExistsGlob= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "ConditionPathIsDirectory",
                choices: [],
                doc: "Verifies whether a certain path exists and is a directory before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to ConditionPathIsDirectory= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "ConditionPathIsSymbolicLink",
                choices: [],
                doc: "Verifies whether a certain path exists and is a symbolic link before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to ConditionPathIsSymbolicLink= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "ConditionPathIsMountPoint",
                choices: [],
                doc: "Verifies whether a certain path exists and is a symbolic link before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to ConditionPathIsMountPoint= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "ConditionPathIsReadWrite",
                choices: [],
                doc: "Verifies whether a certain path exists and is readable/writable before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to ConditionPathIsReadWrite= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "ConditionDirectoryNotEmpty",
                choices: [],
                doc: "Verifies whether a certain path exists and is a non-empty directory before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to ConditionDirectoryNotEmpty= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "ConditionFileNotEmpty",
                choices: [],
                doc: "Verifies whether a certain path exists and refers to a regular file with a non-zero size before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to ConditionFileNotEmpty= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "ConditionFileIsExecutable",
                choices: [],
                doc: "Verifies verifies whether a certain path exists, is a regular file and marked executable before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to ConditionFileIsExecutable= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "AssertArchitecture",
                choices: ["x86", "x86-64", "ppc", "ppc-le", "ppc64", "ppc64-le", "ia64", "parisc", "parisc64", "s390", "s390x", "sparc", "sparc64", "mips", "mips-le", "mips64", "mips64-le", "alpha", "arm", "arm-be", "arm64", "arm64-be", "sh", "sh64", "m86k", "tilegx", "cris"],
                doc: "AssertArchitecture= may be used to check whether the system is running on a specific architecture. Takes one of x86, x86-64, ppc, ppc-le, ppc64, ppc64-le, ia64, parisc, parisc64, s390, s390x, sparc, sparc64, mips, mips-le, mips64, mips64-le, alpha, arm, arm-be, arm64, arm64-be, sh, sh64, m86k, tilegx, cris to test against a specific architecture. The architecture is determined from the information returned by uname(2) and is thus subject to personality(2). Note that a Personality= setting in the same unit file has no effect on this condition. A special architecture name native is mapped to the architecture the system manager itself is compiled for. The test may be negated by prepending an exclamation mark."
            },
            {
                name: "AssertVirtualization",
                choices: ["qemu", "kvm", "zvm", "vmware", "microsoft", "oracle", "xen", "bochs", "uml", "openvz", "lxc", "lxc-libvirt", "systemd-nspawn", "docker", "rkt"],
                doc: "Checks whether the system is executed in a virtualized environment and optionally test whether it is a specific implementation. Takes either boolean value to check if being executed in any virtualized environment, or one of vm and container to test against a generic type of virtualization solution, or one of qemu, kvm, zvm, vmware, microsoft, oracle, xen, bochs, uml, openvz, lxc, lxc-libvirt, systemd-nspawn, docker, rkt to test against a specific implementation, or private-users to check whether we are running in a user namespace. See systemd-detect-virt(1) for a full list of known virtualization technologies and their identifiers. If multiple virtualization technologies are nested, only the innermost is considered. The test may be negated by prepending an exclamation mark."
            },
            {
                name: "AssertHost",
                choices: [],
                doc: "Matches against the hostname or machine ID of the host. This either takes a hostname string (optionally with shell style globs) which is tested against the locally set hostname as returned by gethostname(2), or a machine ID formatted as string (see machine-id(5)). The test may be negated by prepending an exclamation mark."
            },
            {
                name: "AssertKernelCommandLine",
                choices: [],
                doc: "Checks whether a specific kernel command line option is set (or if prefixed with the exclamation mark unset). The argument must either be a single word, or an assignment (i.e. two words, separated \"=\"). In the former case the kernel command line is searched for the word appearing as is, or as left hand side of an assignment. In the latter case, the exact assignment is looked for with right and left hand side matching."
            },
            {
                name: "AssertSecurity",
                choices: ["selinux", "apparmor", "ima", "smack", "audit"],
                doc: "Checks whether the given security module is enabled on the system. Currently, the recognized values are selinux, apparmor, ima, smack and audit. The test may be negated by prepending an exclamation mark."
            },
            {
                name: "AssertCapability",
                choices: [],
                doc: "Checks whether the given capability exists in the capability bounding set of the service manager (i.e. this does not check whether capability is actually available in the permitted or effective sets, see capabilities(7) for details). Pass a capability name such as \"CAP_MKNOD\", possibly prefixed with an exclamation mark to negate the check."
            },
            {
                name: "AssertACPower",
                choices: ["true", "false"],
                doc: "Checks whether the system has AC power, or is exclusively battery powered at the time of activation of the unit. This takes a boolean argument. If set to true, the condition will hold only if at least one AC connector of the system is connected to a power source, or if no AC connectors are known. Conversely, if set to false, the condition will hold only if there is at least one AC connector known and all AC connectors are disconnected from a power source."
            },
            {
                name: "AssertNeedsUpdate",
                choices: ["/var", "/etc", "!/var", "!/etc"],
                doc: "Checks whether the specified directory requires an update because /usr's modification time is newer than the stamp file .updated in the specified directory. This is useful to implement offline updates of the vendor operating system resources in /usr that require updating of /etc or /var on the next following boot. Units making use of this condition should order themselves before systemd-update-done.service(8), to make sure they run before the stamp file's modification time gets reset indicating a completed update. Takes one of /var or /etc as argument, possibly prefixed with a \"!\" (for inverting the condition)."
            },
            {
                name: "AssertFirstBoot",
                choices: ["true", "false"],
                doc: "Checks whether the system is booting up with an unpopulated /etc directory. This may be used to populate /etc on the first boot after factory reset, or when a new system instances boots up for the first time."
            },
            {
                name: "AssertPathExists",
                choices: [],
                doc: "Checks whether a file exists before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to AssertPathExists= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "AssertPathExistsGlob",
                choices: [],
                doc: "Verifies the existence of at least one file or directory matching the specified globbing pattern before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to AssertPathExistsGlob= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "AssertPathIsDirectory",
                choices: [],
                doc: "Verifies whether a certain path exists and is a directory before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to AssertPathIsDirectory= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "AssertPathIsSymbolicLink",
                choices: [],
                doc: "Verifies whether a certain path exists and is a symbolic link before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to AssertPathIsSymbolicLink= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "AssertPathIsMountPoint",
                choices: [],
                doc: "Verifies whether a certain path exists and is a symbolic link before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to AssertPathIsMountPoint= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "AssertPathIsReadWrite",
                choices: [],
                doc: "Verifies whether a certain path exists and is readable/writable before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to AssertPathIsReadWrite= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "AssertDirectoryNotEmpty",
                choices: [],
                doc: "Verifies whether a certain path exists and is a non-empty directory before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to AssertDirectoryNotEmpty= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "AssertFileNotEmpty",
                choices: [],
                doc: "Verifies whether a certain path exists and refers to a regular file with a non-zero size before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to AssertFileNotEmpty= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "AssertFileIsExecutable",
                choices: [],
                doc: "Verifies verifies whether a certain path exists, is a regular file and marked executable before a unit is started. If the specified absolute path name does not exist, the condition will fail. If the absolute path name passed to AssertFileIsExecutable= is prefixed with an exclamation mark (\"!\"), the test is negated, and the unit is only started if the path does not exist."
            },
            {
                name: "SourcePath",
                choices: [],
                doc: "A path to a configuration file this unit has been generated from. This is primarily useful for implementation of generator tools that convert configuration from an external configuration file format into native unit files. This functionality should not be used in normal units."
            }
        ])
    },
    {
        name: "Install",
        fileMatch: /.+/,
        doc: "Carries installation information for the unit. This section is not interpreted by systemd(1) during runtime; it is used by the enable and disable commands of the systemctl(1) tool during installation of a unit. Note that settings in the \"[Install]\" section may not appear in .d/*.conf unit file drop-ins (see above).",
        settings: List<SettingInfo>([
            {
                name: "Alias",
                choices: [],
                doc: "A space-separated list of additional names this unit shall be installed under. The names listed here must have the same suffix (i.e. type) as the unit file name. This option may be specified more than once, in which case all listed names are used. At installation time, systemctl enable will create symlinks from these names to the unit filename. Note that not all unit types support such alias names, and this setting is not supported for them. Specifically, mount, slice, swap, and automount units do not support aliasing."
            },
            {
                name: "WantedBy",
                choices: [],
                doc: "A symbolic link is created in the .wants/ directory of each of the listed units when this unit is installed by systemctl enable. This has the effect that a dependency of type Wants= is added from the listed unit to the current unit. The primary result is that the current unit will be started when the listed unit is started. This option may be used more than once, or a space-separated list of unit names may be given."
            },
            {
                name: "RequiredBy",
                choices: [],
                doc: "A symbolic link is created in the .requires/ directory of each of the listed units when this unit is installed by systemctl enable. This has the effect that a dependency of type Required= is added from the listed unit to the current unit. The primary result is that the current unit will be started when the listed unit is started. This option may be used more than once, or a space-separated list of unit names may be given."
            },
            {
                name: "Also",
                choices: [],
                doc: "Additional units to install/deinstall when this unit is installed/deinstalled. If the user requests installation/deinstallation of a unit with this option configured, systemctl enable and systemctl disable will automatically install/uninstall units listed in this option as well. This option may be used more than once, or a space-separated list of unit names may be given."
            },
            {
                name: "DefaultInstance",
                choices: [],
                doc: "In template unit files, this specifies for which instance the unit shall be enabled if the template is enabled without any explicitly set instance. This option has no effect in non-template unit files. The specified string must be usable as instance identifier."
            }
        ])
    },
    {
        name: "Service",
        fileMatch: /.+\.service/,
        doc: " unit configuration file whose name ends in .service encodes information about a process controlled and supervised by systemd.",
        settings: execSettings.concat([
            {
                name: "Type",
                choices: ["simple", "forking", "oneshot", "dbus", "notify", "idle"],
                doc: "Configures the process start-up type for this service unit. One of simple, forking, oneshot, dbus, notify or idle.\n\nIf set to simple (the default if neither Type= nor BusName=, but ExecStart= are specified), it is expected that the process configured with ExecStart= is the main process of the service. In this mode, if the process offers functionality to other processes on the system, its communication channels should be installed before the daemon is started up (e.g. sockets set up by systemd, via socket activation), as systemd will immediately proceed starting follow-up units.\n\nIf set to forking, it is expected that the process configured with ExecStart= will call fork() as part of its start-up. The parent process is expected to exit when start-up is complete and all communication channels are set up. The child continues to run as the main daemon process. This is the behavior of traditional UNIX daemons. If this setting is used, it is recommended to also use the PIDFile= option, so that systemd can identify the main process of the daemon. systemd will proceed with starting follow-up units as soon as the parent process exits.\n\nBehavior of oneshot is similar to simple; however, it is expected that the process has to exit before systemd starts follow-up units. RemainAfterExit= is particularly useful for this type of service. This is the implied default if neither Type= or ExecStart= are specified.\n\nBehavior of dbus is similar to simple; however, it is expected that the daemon acquires a name on the D-Bus bus, as configured by BusName=. systemd will proceed with starting follow-up units after the D-Bus bus name has been acquired. Service units with this option configured implicitly gain dependencies on the dbus.socket unit. This type is the default if BusName= is specified.\n\nBehavior of notify is similar to simple; however, it is expected that the daemon sends a notification message via sd_notify(3) or an equivalent call when it has finished starting up. systemd will proceed with starting follow-up units after this notification message has been sent. If this option is used, NotifyAccess= (see below) should be set to open access to the notification socket provided by systemd. If NotifyAccess= is missing or set to none, it will be forcibly set to main. Note that currently Type=notify will not work if used in combination with PrivateNetwork=yes.\n\nBehavior of idle is very similar to simple; however, actual execution of the service binary is delayed until all active jobs are dispatched. This may be used to avoid interleaving of output of shell services with the status output on the console. Note that this type is useful only to improve console output, it is not useful as a general unit ordering tool, and the effect of this service type is subject to a 5s time-out, after which the service binary is invoked anyway."
            },
            {
                name: "RemainAfterExit",
                choices: ["true", "false"],
                doc: "Takes a boolean value that specifies whether the service shall be considered active even when all its processes exited. Defaults to no."
            },
            {
                name: "GuessMainPID",
                choices: ["true", "false"],
                doc: "Takes a boolean value that specifies whether systemd should try to guess the main PID of a service if it cannot be determined reliably. This option is ignored unless Type=forking is set and PIDFile= is unset because for the other types or with an explicitly configured PID file, the main PID is always known. The guessing algorithm might come to incorrect conclusions if a daemon consists of more than one process. If the main PID cannot be determined, failure detection and automatic restarting of a service will not work reliably. Defaults to yes."
            },
            {
                name: "PIDFile",
                choices: [],
                doc: "Takes an absolute file name pointing to the PID file of this daemon. Use of this option is recommended for services where Type= is set to forking. systemd will read the PID of the main process of the daemon after start-up of the service. systemd will not write to the file configured here, although it will remove the file after the service has shut down if it still exists."
            },
            {
                name: "BusName",
                choices: [],
                doc: "Takes a D-Bus bus name that this service is reachable as. This option is mandatory for services where Type= is set to dbus."
            },
            {
                name: "ExecStart",
                choices: [],
                doc: 'Commands with their arguments that are executed when this service is started. The value is split into zero or more command lines according to the rules described below (see section "Command Lines" below).\n\nUnless Type= is oneshot, exactly one command must be given. When Type=oneshot is used, zero or more commands may be specified. Commands may be specified by providing multiple command lines in the same directive, or alternatively, this directive may be specified more than once with the same effect. If the empty string is assigned to this option, the list of commands to start is reset, prior assignments of this option will have no effect. If no ExecStart= is specified, then the service must have RemainAfterExit=yes and at least one ExecStop= line set. (Services lacking both ExecStart= and ExecStop= are not valid.)\n\nFor each of the specified commands, the first argument must be an absolute path to an executable. Optionally, if this file name is prefixed with "@", the second token will be passed as "argv[0]" to the executed process, followed by the further arguments specified. If the absolute filename is prefixed with "-", an exit code of the command normally considered a failure (i.e. non-zero exit status or abnormal exit due to signal) is ignored and considered success. If the absolute path is prefixed with "+" then it is executed with full privileges. "@", "-", and "+" may be used together and they can appear in any order.\n\nIf more than one command is specified, the commands are invoked sequentially in the order they appear in the unit file. If one of the commands fails (and is not prefixed with "-"), other lines are not executed, and the unit is considered failed.\n\nUnless Type=forking is set, the process started via this command line will be considered the main process of the daemon.'
            },
            {
                name: "ExecStartPre",
                choices: [],
                doc: 'Additional commands that are executed before the command in ExecStart=, respectively. Syntax is the same as for ExecStart=, except that multiple command lines are allowed and the commands are executed one after the other, serially.\n\nIf any of those commands (not prefixed with "-") fail, the rest are not executed and the unit is considered failed.\n\nExecStart= commands are only run after all ExecStartPre= commands that were not prefixed with a "-" exit successfully.\n\nExecStartPost= commands are only run after the service has started successfully, as determined by Type= (i.e. the process has been started for Type=simple or Type=idle, the process exits successfully for Type=oneshot, the initial process exits successfully for Type=forking, "READY=1" is sent for Type=notify, or the BusName= has been taken for Type=dbus).\n\nNote that ExecStartPre= may not be used to start long-running processes. All processes forked off by processes invoked via ExecStartPre= will be killed before the next service process is run.\n\nNote that if any of the commands specified in ExecStartPre=, ExecStart=, or ExecStartPost= fail (and are not prefixed with "-", see above) or time out before the service is fully up, execution continues with commands specified in ExecStopPost=, the commands in ExecStop= are skipped.'
            },
            {
                name: "ExecStartPost",
                choices: [],
                doc: 'Additional commands that are executed after the command in ExecStart=. Syntax is the same as for ExecStart=, except that multiple command lines are allowed and the commands are executed one after the other, serially.\n\nIf any of those commands (not prefixed with "-") fail, the rest are not executed and the unit is considered failed.\n\nExecStart= commands are only run after all ExecStartPre= commands that were not prefixed with a "-" exit successfully.\n\nExecStartPost= commands are only run after the service has started successfully, as determined by Type= (i.e. the process has been started for Type=simple or Type=idle, the process exits successfully for Type=oneshot, the initial process exits successfully for Type=forking, "READY=1" is sent for Type=notify, or the BusName= has been taken for Type=dbus).\n\nNote that ExecStartPre= may not be used to start long-running processes. All processes forked off by processes invoked via ExecStartPre= will be killed before the next service process is run.\n\nNote that if any of the commands specified in ExecStartPre=, ExecStart=, or ExecStartPost= fail (and are not prefixed with "-", see above) or time out before the service is fully up, execution continues with commands specified in ExecStopPost=, the commands in ExecStop= are skipped.'
            },
            {
                name: "ExecReload",
                choices: [],
                doc: 'Commands to execute to trigger a configuration reload in the service. This argument takes multiple command lines, following the same scheme as described for ExecStart= above. Use of this setting is optional. Specifier and environment variable substitution is supported here following the same scheme as for ExecStart=.\n\nOne additional, special environment variable is set: if known, $MAINPID is set to the main process of the daemon, and may be used for command lines like the following:\n\n/bin/kill -HUP $MAINPID\n\nNote however that reloading a daemon by sending a signal (as with the example line above) is usually not a good choice, because this is an asynchronous operation and hence not suitable to order reloads of multiple services against each other. It is strongly recommended to set ExecReload= to a command that not only triggers a configuration reload of the daemon, but also synchronously waits for it to complete.'
            },
            {
                name: "ExecStop",
                choices: [],
                doc: 'Commands to execute to stop the service started via ExecStart=. This argument takes multiple command lines, following the same scheme as described for ExecStart= above. Use of this setting is optional. After the commands configured in this option are run, all processes remaining for a service are terminated according to the KillMode= setting (see systemd.kill(5)). If this option is not specified, the process is terminated by sending the signal specified in KillSignal= when service stop is requested. Specifier and environment variable substitution is supported (including $MAINPID, see above).\n\nNote that it is usually not sufficient to specify a command for this setting that only asks the service to terminate (for example, by queuing some form of termination signal for it), but does not wait for it to do so. Since the remaining processes of the services are killed according to KillMode= and KillSignal= as described above immediately after the command exited, this may not result in a clean stop. The specified command should hence be a synchronous operation, not an asynchronous one.\n\nNote that the commands specified in ExecStop= are only executed when the service started successfully first. They are not invoked if the service was never started at all, or in case its start-up failed, for example because any of the commands specified in ExecStart=, ExecStartPre= or ExecStartPost= failed (and weren\'t prefixed with "-", see above) or timed out. Use ExecStopPost= to invoke commands when a service failed to start up correctly and is shut down again.\n\nIt is recommended to use this setting for commands that communicate with the service requesting clean termination. When the commands specified with this option are executed it should be assumed that the service is still fully up and is able to react correctly to all commands. For post-mortem clean-up steps use ExecStopPost= instead.'
            },
            {
                name: "ExecStopPost",
                choices: [],
                doc: "Additional commands that are executed after the service is stopped. This includes cases where the commands configured in ExecStop= were used, where the service does not have any ExecStop= defined, or where the service exited unexpectedly. This argument takes multiple command lines, following the same scheme as described for ExecStart=. Use of these settings is optional. Specifier and environment variable substitution is supported. Note that – unlike ExecStop= – commands specified with this setting are invoked when a service failed to start up correctly and is shut down again.\n\nIt is recommended to use this setting for clean-up operations that shall be executed even when the service failed to start up correctly. Commands configured with this setting need to be able to operate even if the service failed starting up half-way and left incompletely initialized data around. As the service's processes have been terminated already when the commands specified with this setting are executed they should not attempt to communicate with them.\n\nNote that all commands that are configured with this setting are invoked with the result code of the service, as well as the main process' exit code and status, set in the $SERVICE_RESULT, $EXIT_CODE and $EXIT_STATUS environment variables, see systemd.exec(5) for details."
            },
            {
                name: "RestartSec",
                choices: [],
                doc: "Configures the time to sleep before restarting a service (as configured with Restart=). Takes a unit-less value in seconds, or a time span value such as \"5min 20s\". Defaults to 100ms."
            },
            {
                name: "TimeoutStartSec",
                choices: ["infinity"],
                doc: 'Configures the time to wait for start-up. If a daemon service does not signal start-up completion within the configured time, the service will be considered failed and will be shut down again. Takes a unit-less value in seconds, or a time span value such as "5min 20s". Pass "infinity" to disable the timeout logic. Defaults to DefaultTimeoutStartSec= from the manager configuration file, except when Type=oneshot is used, in which case the timeout is disabled by default'
            },
            {
                name: "TimeoutStopSec",
                choices: ["infinity"],
                doc: 'Configures the time to wait for stop. If a service is asked to stop, but does not terminate in the specified time, it will be terminated forcibly via SIGTERM, and after another timeout of equal duration with SIGKILL (see KillMode= in systemd.kill(5)). Takes a unit-less value in seconds, or a time span value such as "5min 20s". Pass "infinity" to disable the timeout logic. Defaults to DefaultTimeoutStopSec= from the manager configuration file'
            },
            {
                name: "TimeoutSec",
                choices: ["infinity"],
                doc: "A shorthand for configuring both TimeoutStartSec= and TimeoutStopSec= to the specified value."
            },
            {
                name: "RuntimeMaxSec",
                choices: ["infinity"],
                doc: 'Configures a maximum time for the service to run. If this is used and the service has been active for longer than the specified time it is terminated and put into a failure state. Note that this setting does not have any effect on Type=oneshot services, as they terminate immediately after activation completed. Pass "infinity" (the default) to configure no runtime limit.'
            },
            {
                name: "WatchdogSec",
                choices: [],
                doc: `Configures the watchdog timeout for a service. The watchdog is activated when the start-up is completed. The service must call sd_notify(3) regularly with "WATCHDOG=1" (i.e. the "keep-alive ping"). If the time between two such calls is larger than the configured time, then the service is placed in a failed state and it will be terminated with SIGABRT. By setting Restart= to on-failure, on-watchdog, on-abnormal or always, the service will be automatically restarted. The time configured here will be passed to the executed service process in the WATCHDOG_USEC= environment variable. This allows daemons to automatically enable the keep-alive pinging logic if watchdog support is enabled for the service. If this option is used, NotifyAccess= (see below) should be set to open access to the notification socket provided by systemd. If NotifyAccess= is not set, it will be implicitly set to main. Defaults to 0, which disables this feature. The service can check whether the service manager expects watchdog keep-alive notifications. See sd_watchdog_enabled(3) for details. sd_event_set_watchdog(3) may be used to enable automatic watchdog notification support.`
            },
            {
                name: "Restart",
                choices: ["no", "on-success", " on-failure", "on-abnormal", "on-watchdog", "on-abort", "always"],
                doc: 'Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached. The service process may be the main service process, but it may also be one of the processes specified with ExecStartPre=, ExecStartPost=, ExecStop=, ExecStopPost=, or ExecReload=. When the death of the process is a result of systemd operation (e.g. service stop or restart), the service will not be restarted. Timeouts include missing the watchdog "keep-alive ping" deadline and a service start, reload, and stop operation timeouts.\n\nTakes one of no, on-success, on-failure, on-abnormal, on-watchdog, on-abort, or always. If set to no (the default), the service will not be restarted. If set to on-success, it will be restarted only when the service process exits cleanly. In this context, a clean exit means an exit code of 0, or one of the signals SIGHUP, SIGINT, SIGTERM or SIGPIPE, and additionally, exit statuses and signals specified in SuccessExitStatus=. If set to on-failure, the service will be restarted when the process exits with a non-zero exit code, is terminated by a signal (including on core dump, but excluding the aforementioned four signals), when an operation (such as service reload) times out, and when the configured watchdog timeout is triggered. If set to on-abnormal, the service will be restarted when the process is terminated by a signal (including on core dump, excluding the aforementioned four signals), when an operation times out, or when the watchdog timeout is triggered. If set to on-abort, the service will be restarted only if the service process exits due to an uncaught signal not specified as a clean exit status. If set to on-watchdog, the service will be restarted only if the watchdog timeout for the service expires. If set to always, the service will be restarted regardless of whether it exited cleanly or not, got terminated abnormally by a signal, or hit a timeout.'
            },
            {
                name: "SuccessExitStatus",
                choices: [],
                doc: 'Takes a list of exit status definitions that, when returned by the main service process, will be considered successful termination, in addition to the normal successful exit code 0 and the signals SIGHUP, SIGINT, SIGTERM, and SIGPIPE. Exit status definitions can either be numeric exit codes or termination signal names, separated by spaces. For example:\n\nSuccessExitStatus=1 2 8 SIGKILL\n\nensures that exit codes 1, 2, 8 and the termination signal SIGKILL are considered clean service terminations.\n\nNote that if a process has a signal handler installed and exits by calling _exit(2) in response to a signal, the information about the signal is lost. Programs should instead perform cleanup and kill themselves with the same signal instead. See Proper handling of SIGINT/SIGQUIT — How to be a proper program.\n\nThis option may appear more than once, in which case the list of successful exit statuses is merged. If the empty string is assigned to this option, the list is reset, all prior assignments of this option will have no effect.'
            },
            {
                name: "RestartPreventExitStatus",
                choices: [],
                doc: 'Takes a list of exit status definitions that, when returned by the main service process, will prevent automatic service restarts, regardless of the restart setting configured with Restart=. Exit status definitions can either be numeric exit codes or termination signal names, and are separated by spaces. Defaults to the empty list, so that, by default, no exit status is excluded from the configured restart logic. For example:\n\nRestartPreventExitStatus=1 6 SIGABRT\n\nensures that exit codes 1 and 6 and the termination signal SIGABRT will not result in automatic service restarting. This option may appear more than once, in which case the list of restart-preventing statuses is merged. If the empty string is assigned to this option, the list is reset and all prior assignments of this option will have no effect.'
            },
            {
                name: "RestartForceExitStatus",
                choices: [],
                doc: "Takes a list of exit status definitions that, when returned by the main service process, will force automatic service restarts, regardless of the restart setting configured with Restart=. The argument format is similar to RestartPreventExitStatus=."
            },
            {
                name: "PermissionsStartOnly",
                choices: ["true", "false"],
                doc: "Takes a boolean argument. If true, the permission-related execution options, as configured with User= and similar options (see systemd.exec(5) for more information), are only applied to the process started with ExecStart=, and not to the various other ExecStartPre=, ExecStartPost=, ExecReload=, ExecStop=, and ExecStopPost= commands. If false, the setting is applied to all configured commands the same way. Defaults to false."
            },
            {
                name: "RootDirectoryStartOnly",
                choices: [],
                doc: "Takes a boolean argument. If true, the root directory, as configured with the RootDirectory= option, is only applied to the process started with ExecStart=, and not to the various other ExecStartPre=, ExecStartPost=, ExecReload=, ExecStop=, and ExecStopPost= commands. If false, the setting is applied to all configured commands the same way. Defaults to false."
            },
            {
                "name": "NonBlocking",
                "choices": [],
                "doc": "Set the O_NONBLOCK flag for all file descriptors passed via socket-based activation. If true, all file descriptors >= 3 (i.e. all except stdin, stdout, and stderr) will have the O_NONBLOCK flag set and hence are in non-blocking mode. This option is only useful in conjunction with a socket unit, as described in systemd.socket(5). Defaults to false."
            },
            {
                "name": "NotifyAccess",
                "choices": [],
                "doc": "Controls access to the service status notification socket, as accessible via the sd_notify(3) call. Takes one of none (the default), main, exec or all. If none, no daemon status updates are accepted from the service processes, all status update messages are ignored. If main, only service updates sent from the main process of the service are accepted. If exec, only service updates sent from any of the main or control processes originating from one of the Exec*= commands are accepted. If all, all services updates from all members of the service's control group are accepted. This option should be set to open access to the notification socket when using Type=notify or WatchdogSec= (see above). If those options are used but NotifyAccess= is not configured, it will be implicitly set to main.\n\nNote that sd_notify() notifications may be attributed to units correctly only if either the sending process is still around at the time PID 1 processes the message, or if the sending process is explicitly runtime-tracked by the service manager. The latter is the case if the service manager originally forked off the process, i.e. on all processes that match main or exec. Conversely, if an auxiliary process of the unit sends an sd_notify() message and immediately exits, the service manager might not be able to properly attribute the message to the unit, and thus will ignore it, even if NotifyAccess=all is set for it."
            },
            {
                "name": "Sockets",
                "choices": [],
                "doc": "Specifies the name of the socket units this service shall inherit socket file descriptors from when the service is started. Normally, it should not be necessary to use this setting, as all socket file descriptors whose unit shares the same name as the service (subject to the different unit name suffix of course) are passed to the spawned process.\n\nNote that the same socket file descriptors may be passed to multiple processes simultaneously. Also note that a different service may be activated on incoming socket traffic than the one which is ultimately configured to inherit the socket file descriptors. Or, in other words: the Service= setting of .socket units does not have to match the inverse of the Sockets= setting of the .service it refers to.\n\nThis option may appear more than once, in which case the list of socket units is merged. If the empty string is assigned to this option, the list of sockets is reset, and all prior uses of this setting will have no effect."
            },
            {
                "name": "FailureAction",
                "choices": [],
                "doc": "Configure the action to take when the service enters a failed state. Takes the same values as the unit setting StartLimitAction= and executes the same actions (see systemd.unit(5)). Defaults to none."
            },
            {
                "name": "FileDescriptorStoreMax",
                "choices": [],
                "doc": "Configure how many file descriptors may be stored in the service manager for the service using sd_pid_notify_with_fds(3)'s \"FDSTORE=1\" messages. This is useful for implementing service restart schemes where the state is serialized to /run and the file descriptors passed to the service manager, to allow restarts without losing state. Defaults to 0, i.e. no file descriptors may be stored in the service manager. All file descriptors passed to the service manager from a specific service are passed back to the service's main process on the next service restart. Any file descriptors passed to the service manager are automatically closed when POLLHUP or POLLERR is seen on them, or when the service is fully stopped and no job is queued or being executed for it."
            },
            {
                "name": "USBFunctionDescriptors",
                "choices": [],
                "doc": "Configure the location of a file containing USB FunctionFS descriptors, for implementation of USB gadget functions. This is used only in conjunction with a socket unit with ListenUSBFunction= configured. The contents of this file are written to the ep0 file after it is opened."
            },
            {
                "name": "USBFunctionStrings",
                "choices": [],
                "doc": "Configure the location of a file containing USB FunctionFS strings. Behavior is similar to USBFunctionDescriptors= above."
            }
        ]).toList()
    },
    {
        name: "Socket",
        fileMatch: /.+\.socket$/,
        doc: "A unit configuration file whose name ends in \".socket\" encodes information about an IPC or network socket or a file system FIFO controlled and supervised by systemd, for socket-based activation.",
        settings: execSettings.concat([
            {
                name: "ListenStream",
                choices: [],
                doc: "Specifies an address to listen on for a stream (SOCK_STREAM)."
            },
            {
                name: "ListenDatagram",
                choices: [],
                doc: "Specifies an address to listen on for a datagram (SOCK_DGRAM)."
            },
            {
                name: "ListenStream",
                choices: [],
                doc: "Specifies an address to listen on for a sequential packet (SOCK_SEQPACKET)."
            },
            {
                name: "ListenFIFO",
                choices: [],
                doc: "Specifies a file system FIFO to listen on. This expects an absolute file system path as argument."
            },
            {
                name: "ListenSpecial",
                choices: [],
                doc: "Specifies a special file in the file system to listen on. This expects an absolute file system path as argument."
            },
            {
                name: "ListenNetlink",
                choices: [],
                doc: "Specifies a Netlink family to create a socket for to listen on. This expects a short string referring to the AF_NETLINK family name (such as audit or kobject-uevent) as argument, optionally suffixed by a whitespace followed by a multicast group integer."
            },
            {
                name: "ListenMessageQueue",
                choices: [],
                doc: "Specifies a POSIX message queue name to listen on. This expects a valid message queue name (i.e. beginning with /). Behavior otherwise is very similar to the ListenFIFO= directive above. On Linux message queue descriptors are actually file descriptors and can be inherited between processes."
            },
            {
                name: "ListenUSBFunction",
                choices: [],
                doc: "Specifies a USB FunctionFS endpoints location to listen on, for implementation of USB gadget functions. This expects an absolute file system path of functionfs mount point as the argument. Behavior otherwise is very similar to the ListenFIFO= directive above. Use this to open the FunctionFS endpoint ep0. When using this option, the activated service has to have the USBFunctionDescriptors= and USBFunctionStrings= options set."
            },
            {
                name: "SocketProtocol",
                choices: ["udplite", "sctp"],
                doc: "Specifies a socket protocol (IPPROTO_UDPLITE) UDP-Lite (IPPROTO_SCTP) SCTP socket respectively. Takes a one of udplite or sctp."
            },
            {
                name: "BindIPv6Only",
                choices: ["default", "both", "ipv6-only"],
                doc: "Controls the IPV6_V6ONLY socket option (see ipv6(7) for details). If both, IPv6 sockets bound will be accessible via both IPv4 and IPv6. If ipv6-only, they will be accessible via IPv6 only. If default (which is the default, surprise!), the system wide default setting is used, as controlled by /proc/sys/net/ipv6/bindv6only, which in turn defaults to the equivalent of both. Takes a one of default, both or ipv6-only."
            },
            {
                name: "Backlog",
                choices: [],
                doc: "Specifies the number of connections to queue that have not been accepted yet. This setting matters only for stream and sequential packet sockets. See listen(2) for details. Defaults to SOMAXCONN (128). Takes an unsigned integer argument."
            },
            {
                name: "BindToDevice",
                choices: [],
                doc: "Specifies a network interface name to bind this socket to. If set, traffic will only be accepted from the specified network interfaces. This controls the SO_BINDTODEVICE socket option (see socket(7) for details). If this option is used, an automatic dependency from this socket unit on the network interface device unit (systemd.device(5) is created. Note that setting this parameter might result in additional dependencies to be added to the unit (see above)."
            },
            {
                name: "SocketUser",
                choices: [],
                doc: "Takes a UNIX user/group name. When specified, all AF_UNIX sockets and FIFO nodes in the file system are owned by the specified user and group. If unset (the default), the nodes are owned by the root user/group (if run in system context) or the invoking user/group (if run in user context). If only a user is specified but no group, then the group is derived from the user's default group."
            },
            {
                name: "SocketGroup",
                choices: [],
                doc: "Takes a UNIX user/group name. When specified, all AF_UNIX sockets and FIFO nodes in the file system are owned by the specified user and group. If unset (the default), the nodes are owned by the root user/group (if run in system context) or the invoking user/group (if run in user context). If only a user is specified but no group, then the group is derived from the user's default group."
            },
            {
                name: "SocketMode",
                choices: [],
                doc: "If listening on a file system socket or FIFO, this option specifies the file system access mode used when creating the file node. Takes an access mode in octal notation. Defaults to 0666."
            },
            {
                name: "DirectoryMode",
                choices: [],
                doc: "If listening on a file system socket or FIFO, the parent directories are automatically created if needed. This option specifies the file system access mode used when creating these directories. Takes an access mode in octal notation. Defaults to 0755."
            },
            {
                name: "Accept",
                choices: ["true", "false"],
                doc: "If true, a service instance is spawned for each incoming connection and only the connection socket is passed to it. If false, all listening sockets themselves are passed to the started service unit, and only one service unit is spawned for all connections (also see above). This value is ignored for datagram sockets and FIFOs where a single service unit unconditionally handles all incoming traffic. Defaults to false. For performance reasons, it is recommended to write new daemons only in a way that is suitable for Accept=false. A daemon listening on an AF_UNIX socket may, but does not need to, call close(2) on the received socket before exiting. However, it must not unlink the socket from a file system. It should not invoke shutdown(2) on sockets it got with Accept=false, but it may do so for sockets it got with Accept=true set. Setting Accept=true is mostly useful to allow daemons designed for usage with inetd(8) to work unmodified with systemd socket activation."
            },
            {
                name: "Writable",
                choices: ["true", "false"],
                doc: "May only be used in conjunction with ListenSpecial=. If true, the specified special file is opened in read-write mode, if false, in read-only mode. Defaults to false."
            },
            {
                name: "MaxConnections",
                choices: [],
                doc: "The maximum number of connections to simultaneously run services instances for, when Accept=true is set. If more concurrent connections are coming in, they will be refused until at least one existing connection is terminated. This setting has no effect on sockets configured with Accept=false or datagram sockets. Defaults to 64."
            },
            {
                name: "MaxConnectionsPerSource",
                choices: [],
                doc: "The maximum number of connections for a service per source IP address. This is very similar to the MaxConnections= directive above. Disabled by default."
            },
            {
                name: "KeepAlive",
                choices: ["true", "false"],
                doc: "Takes a boolean argument. If true, the TCP/IP stack will send a keep alive message after 2h (depending on the configuration of /proc/sys/net/ipv4/tcp_keepalive_time) for all TCP streams accepted on this socket. This controls the SO_KEEPALIVE socket option (see socket(7) and the TCP Keepalive HOWTO for details.) Defaults to false."
            },
            {
                name: "KeepAliveTimeSec",
                choices: [],
                doc: "Takes time (in seconds) as argument. The connection needs to remain idle before TCP starts sending keepalive probes. This controls the TCP_KEEPIDLE socket option. Default value is 7200 seconds (2 hours)."
            },
            {
                name: "KeepAliveIntervalSec",
                choices: [],
                doc: "Takes time (in seconds) as argument between individual keepalive probes, if the socket option SO_KEEPALIVE has been set on this socket. This controls the TCP_KEEPINTVL socket option. Defaults value is 75 seconds."
            },
            {
                name: "KeepAliveProbes",
                choices: [],
                doc: "Takes an integer as argument. It is the number of unacknowledged probes to send before considering the connection dead and notifying the application layer. This controls the TCP_KEEPCNT socket option (see socket(7) and the TCP Keepalive HOWTO for details.) Default value is 9."
            },
            {
                name: "NoDelay",
                choices: ["true", "false"],
                doc: "Takes a boolean argument. TCP Nagle's algorithm works by combining a number of small outgoing messages, and sending them all at once. This controls the TCP_NODELAY socket option (see tcp(7) Defaults to false."
            },
            {
                name: "Priority",
                choices: [],
                doc: "Takes an integer argument controlling the priority for all traffic sent from this socket. This controls the SO_PRIORITY socket option."
            },
            {
                name: "DeferAcceptSec",
                choices: [],
                doc: "Takes time (in seconds) as argument. If set, the listening process will be awakened only when data arrives on the socket, and not immediately when connection is established. When this option is set, the TCP_DEFER_ACCEPT socket option will be used (see tcp(7)), and the kernel will ignore initial ACK packets without any data. The argument specifies the approximate amount of time the kernel should wait for incoming data before falling back to the normal behavior of honoring empty ACK packets. This option is beneficial for protocols where the client sends the data first (e.g. HTTP, in contrast to SMTP), because the server process will not be woken up unnecessarily before it can take any action. Disabled by default."
            },
            {
                name: "ReceiveBuffer",
                choices: [],
                doc: "Takes an integer argument controlling the receive or send buffer sizes of this socket, respectively. This controls the SO_RCVBUF and SO_SNDBUF socket options. The usual suffixes K, M, G are supported and are understood to the base of 1024."
            },
            {
                name: "SendBuffer",
                choices: [],
                doc: "Takes an integer argument controlling the receive or send buffer sizes of this socket, respectively. This controls the SO_RCVBUF and SO_SNDBUF socket options. The usual suffixes K, M, G are supported and are understood to the base of 1024."
            },
            {
                name: "IPTOS",
                choices: [],
                doc: "Takes an integer argument controlling the IP Type-Of-Service field for packets generated from this socket. This controls the IP_TOS socket option. Either a numeric string or one of low-delay, throughput, reliability or low-cost may be specified."
            },
            {
                name: "IPTTL",
                choices: [],
                doc: "Takes an integer argument controlling the IPv4 Time-To-Live/IPv6 Hop-Count field for packets generated from this socket. This sets the IP_TTL/IPV6_UNICAST_HOPS socket options (see ip(7) and ipv6(7) for details.)"
            },
            {
                name: "Mark",
                choices: [],
                doc: "Takes an integer value. Controls the firewall mark of packets generated by this socket. This can be used in the firewall logic to filter packets from this socket. This sets the SO_MARK socket option."
            },
            {
                name: "ReusePort",
                choices: ["true", "false"],
                doc: "Takes a boolean value. If true, allows multiple bind(2)s to this TCP or UDP port. This controls the SO_REUSEPORT socket option."
            },
            {
                name: "SmackLabel",
                choices: [],
                doc: "Takes a string value. Controls the extended attributes \"security.SMACK64\", i.e. the security label of the FIFO. See Smack.txt for details."
            },
            {
                name: "SmackLabelIPIn",
                choices: [],
                doc: "Takes a string value. Controls the extended attributes \"security.SMACK64IPIN\", i.e. the security label for the incoming connections of the socket. See Smack.txt for details."
            },
            {
                name: "SmackLabelIPOut",
                choices: [],
                doc: "Takes a string value. Controls the extended attributes \"security.SMACK64IPOUT\", i.e. the security label for the outgoing connections of the socket."
            },
            {
                name: "SELinuxContextFromNet",
                choices: ["true", "false"],
                doc: "Takes a boolean argument. When true, systemd will attempt to figure out the SELinux label used for the instantiated service from the information handed by the peer over the network. Note that only the security level is used from the information provided by the peer. Other parts of the resulting SELinux context originate from either the target binary that is effectively triggered by socket unit or from the value of the SELinuxContext= option. This configuration option only affects sockets with Accept= mode set to \"true\". Also note that this option is useful only when MLS/MCS SELinux policy is deployed. Defaults to \"false\"."
            },
            {
                name: "PipeSize",
                choices: [],
                doc: "Takes a size in bytes. Controls the pipe buffer size of FIFOs configured in this socket unit. See fcntl(2) for details. The usual suffixes K, M, G are supported and are understood to the base of 1024."
            },
            {
                name: "MessageQueueMaxMessages",
                choices: [],
                doc: "Takes an integer value and controld the mq_maxmsg field, when creating the message queue."
            },
            {
                name: "MessageQueueMessageSize",
                choices: [],
                doc: "Takes an integer value and controld the mq_msgsize field, when creating the message queue."
            },
            {
                name: "FreeBind",
                choices: ["true", "false"],
                doc: "Takes a boolean value. Controls whether the socket can be bound to non-local IP addresses. This is useful to configure sockets listening on specific IP addresses before those IP addresses are successfully configured on a network interface. This sets the IP_FREEBIND socket option. For robustness reasons it is recommended to use this option whenever you bind a socket to a specific IP address. Defaults to false."
            },
            {
                name: "Transparent",
                choices: ["true", "false"],
                doc: "Takes a boolean value. Controls the IP_TRANSPARENT socket option. Defaults to false."
            },
            {
                name: "Broadcast",
                choices: ["true", "false"],
                doc: "Takes a boolean value. This controls the SO_BROADCAST socket option, which allows broadcast datagrams to be sent from this socket. Defaults to false."
            },
            {
                name: "PassCredentials",
                choices: ["true", "false"],
                doc: "Takes a boolean value. This controls the SO_PASSCRED socket option, which allows AF_UNIX sockets to receive the credentials of the sending process in an ancillary message. Defaults to false."
            },
            {
                name: "PassSecurity",
                choices: ["true", "false"],
                doc: "Takes a boolean value. This controls the SO_PASSSEC socket option, which allows AF_UNIX sockets to receive the security context of the sending process in an ancillary message. Defaults to false."
            },
            {
                name: "TCPCongestion",
                choices: ["westwood", "veno", "cubic", "lp"],
                doc: 'Takes a string value. Controls the TCP congestion algorithm used by this socket. Should be one of "westwood", "veno", "cubic", "lp" or any other available algorithm supported by the IP stack. This setting applies only to stream sockets.'
            },
            {
                name: "ExecStartPre",
                choices: [],
                doc: "Takes one or more command lines, which are executed before the listening sockets/FIFOs are created and bound. The first token of the command line must be an absolute filename, then followed by arguments for the process. Multiple command lines may be specified following the same scheme as used for ExecStartPre= of service unit files."
            },
            {
                name: "ExecStartPost",
                choices: [],
                doc: "Takes one or more command lines, which are executed after the listening sockets/FIFOs are created and bound. The first token of the command line must be an absolute filename, then followed by arguments for the process. Multiple command lines may be specified following the same scheme as used for ExecStartPre= of service unit files."
            },
            {
                name: "ExecStopPre",
                choices: [],
                doc: "Additional commands that are executed before the listening sockets/FIFOs are closed and removed. Multiple command lines may be specified following the same scheme as used for ExecStartPre= of service unit files."
            },
            {
                name: "ExecStopPost",
                choices: [],
                doc: "Additional commands that are executed after the listening sockets/FIFOs are closed and removed. Multiple command lines may be specified following the same scheme as used for ExecStartPre= of service unit files."
            },
            {
                name: "TimeoutSec",
                choices: [],
                doc: 'Configures the time to wait for the commands specified in ExecStartPre=, ExecStartPost=, ExecStopPre= and ExecStopPost= to finish. If a command does not exit within the configured time, the socket will be considered failed and be shut down again. All commands still running will be terminated forcibly via SIGTERM, and after another delay of this time with SIGKILL. (See KillMode= in systemd.kill(5).) Takes a unit-less value in seconds, or a time span value such as "5min 20s". Pass "0" to disable the timeout logic. Defaults to DefaultTimeoutStartSec= from the manager configuration file'
            },
            {
                name: "Service",
                choices: [],
                doc: "Specifies the service unit name to activate on incoming traffic. This setting is only allowed for sockets with Accept=no. It defaults to the service that bears the same name as the socket (with the suffix replaced). In most cases, it should not be necessary to use this option. Note that setting this parameter might result in additional dependencies to be added to the unit (see above)."
            },
            {
                name: "RemoveOnStop",
                choices: ["true", "false"],
                doc: "Takes a boolean argument. If enabled, any file nodes created by this socket unit are removed when it is stopped. This applies to AF_UNIX sockets in the file system, POSIX message queues, FIFOs, as well as any symlinks to them configured with Symlinks=. Normally, it should not be necessary to use this option, and is not recommended as services might continue to run after the socket unit has been terminated and it should still be possible to communicate with them via their file system node. Defaults to off."
            },
            {
                name: "Symlinks",
                choices: [],
                doc: "Takes a list of file system paths. The specified paths will be created as symlinks to the AF_UNIX socket path or FIFO path of this socket unit. If this setting is used, only one AF_UNIX socket in the file system or one FIFO may be configured for the socket unit. Use this option to manage one or more symlinked alias names for a socket, binding their lifecycle together. Defaults to the empty list."
            },
            {
                name: "FileDescriptorName",
                choices: [],
                doc: "Assigns a name to all file descriptors this socket unit encapsulates. This is useful to help activated services identify specific file descriptors, if multiple fds are passed. Services may use the sd_listen_fds_with_names(3) call to acquire the names configured for the received file descriptors. Names may contain any ASCII character, but must exclude control characters and \":\", and must be at most 255 characters in length. If this setting is not used, the file descriptor name defaults to the name of the socket unit, including its .socket suffix."
            },
            {
                name: "TriggerLimitIntervalSec",
                choices: [],
                doc: 'Configures a limit on how often this socket unit my be activated within a specific time interval. The TriggerLimitIntervalSec= may be used to configure the length of the time interval in the usual time units "us", "ms", "s", "min", "h", … and defaults to 2s (See systemd.time(7) for details on the various time units understood). The TriggerLimitBurst= setting takes a positive integer value and specifies the number of permitted activations per time interval, and defaults to 200 for Accept=yes sockets (thus by default permitting 200 activations per 2s), and 20 otherwise (20 activations per 2s). Set either to 0 to disable any form of trigger rate limiting. If the limit is hit, the socket unit is placed into a failure mode, and will not be connectible anymore until restarted. Note that this limit is enforced before the service activation is enqueued.'
            },
            {
                name: "TriggerLimitBurst",
                choices: [],
                doc: 'Configures a limit on how often this socket unit my be activated within a specific time interval. The TriggerLimitIntervalSec= may be used to configure the length of the time interval in the usual time units "us", "ms", "s", "min", "h", … and defaults to 2s (See systemd.time(7) for details on the various time units understood). The TriggerLimitBurst= setting takes a positive integer value and specifies the number of permitted activations per time interval, and defaults to 200 for Accept=yes sockets (thus by default permitting 200 activations per 2s), and 20 otherwise (20 activations per 2s). Set either to 0 to disable any form of trigger rate limiting. If the limit is hit, the socket unit is placed into a failure mode, and will not be connectible anymore until restarted. Note that this limit is enforced before the service activation is enqueued.'
            }
        ]).toList()
    },
    {
        name: "Mount",
        doc: "",
        fileMatch: /\w+.mount/,
        settings: execSettings.concat([
            {
                "name": "What",
                "choices": [],
                "doc": "Takes an absolute path of a device node, file or other resource to mount. See mount(8) for details. If this refers to a device node, a dependency on the respective device unit is automatically created. (See systemd.device(5) for more information.) This option is mandatory. Note that the usual specifier expansion is applied to this setting, literal percent characters should hence be written as \"%%\"."
            },
            {
                "name": "Where",
                "choices": [],
                "doc": "Takes an absolute path of a directory of the mount point. If the mount point does not exist at the time of mounting, it is created. This string must be reflected in the unit filename. (See above.) This option is mandatory."
            },
            {
                "name": "Type",
                "choices": [],
                "doc": "Takes a string for the file system type. See mount(8) for details. This setting is optional."
            },
            {
                "name": "Options",
                "choices": [],
                "doc": "Mount options to use when mounting. This takes a comma-separated list of options. This setting is optional. Note that the usual specifier expansion is applied to this setting, literal percent characters should hence be written as \"%%\"."
            },
            {
                "name": "SloppyOptions",
                "choices": [],
                "doc": "Takes a boolean argument. If true, parsing of the options specified in Options= is relaxed, and unknown mount options are tolerated. This corresponds with mount(8)'s -s switch. Defaults to off."
            },
            {
                "name": "LazyUnmount",
                "choices": [],
                "doc": "Takes a boolean argument. If true, detach the filesystem from the filesystem hierarchy at time of the unmount operation, and clean up all references to the filesystem as soon as they are not busy anymore. This corresponds with umount(8)'s -l switch. Defaults to off."
            },
            {
                "name": "ForceUnmount",
                "choices": [],
                "doc": "Takes a boolean argument. If true, force an unmount (in case of an unreachable NFS system). This corresponds with umount(8)'s -f switch. Defaults to off."
            },
            {
                "name": "DirectoryMode",
                "choices": [],
                "doc": "Directories of mount points (and any parent directories) are automatically created if needed. This option specifies the file system access mode used when creating these directories. Takes an access mode in octal notation. Defaults to 0755."
            },
            {
                "name": "TimeoutSec",
                "choices": [],
                "doc": "Configures the time to wait for the mount command to finish. If a command does not exit within the configured time, the mount will be considered failed and be shut down again. All commands still running will be terminated forcibly via SIGTERM, and after another delay of this time with SIGKILL. (See KillMode= in systemd.kill(5).) Takes a unit-less value in seconds, or a time span value such as \"5min 20s\". Pass 0 to disable the timeout logic. The default value is set from the manager configuration file's DefaultTimeoutStartSec= variable."
            }
        ]).toList()
    },
    {
        name: "Automount",
        doc: "",
        fileMatch: /.+\.automount/,
        settings: List<SettingInfo>([
            {
                "name": "Where",
                "choices": [],
                "doc": "Takes an absolute path of a directory of the automount point. If the automount point does not exist at time that the automount point is installed, it is created. This string must be reflected in the unit filename. (See above.) This option is mandatory."
            },
            {
                "name": "DirectoryMode",
                "choices": [],
                "doc": "Directories of automount points (and any parent directories) are automatically created if needed. This option specifies the file system access mode used when creating these directories. Takes an access mode in octal notation. Defaults to 0755."
            },
            {
                "name": "TimeoutIdleSec",
                "choices": [],
                "doc": "Configures an idle timeout. Once the mount has been idle for the specified time, systemd will attempt to unmount. Takes a unit-less value in seconds, or a time span value such as \"5min 20s\". Pass 0 to disable the timeout logic. The timeout is disabled by default."
            }
        ])
    },
    {
        name: "Path",
        fileMatch: /.+\.path/,
        doc: 'A unit configuration file whose name ends in ".path" encodes information about a path monitored by systemd, for path-based activation.',
        settings: List<SettingInfo>([
            {
                "name": "PathExists",
                "choices": [],
                "doc": "Defines paths to monitor for certain changes: PathExists= may be used to watch the mere existence of a file or directory. If the file specified exists, the configured unit is activated. PathExistsGlob= works similar, but checks for the existence of at least one file matching the globbing pattern specified. PathChanged= may be used to watch a file or directory and activate the configured unit whenever it changes. It is not activated on every write to the watched file but it is activated if the file which was open for writing gets closed. PathModified= is similar, but additionally it is activated also on simple writes to the watched file. DirectoryNotEmpty= may be used to watch a directory and activate the configured unit whenever it contains at least one file.\n\nThe arguments of these directives must be absolute file system paths.\n\nMultiple directives may be combined, of the same and of different types, to watch multiple paths. If the empty string is assigned to any of these options, the list of paths to watch is reset, and any prior assignments of these options will not have any effect.\n\nIf a path already exists (in case of PathExists= and PathExistsGlob=) or a directory already is not empty (in case of DirectoryNotEmpty=) at the time the path unit is activated, then the configured unit is immediately activated as well. Something similar does not apply to PathChanged= and PathModified=.\n\nIf the path itself or any of the containing directories are not accessible, systemd will watch for permission changes and notice that conditions are satisfied when permissions allow that."
            },
            {
                "name": "Unit",
                "choices": [],
                "doc": "The unit to activate when any of the configured paths changes. The argument is a unit name, whose suffix is not \".path\". If not specified, this value defaults to a service that has the same name as the path unit, except for the suffix. (See above.) It is recommended that the unit name that is activated and the unit name of the path unit are named identical, except for the suffix."
            },
            {
                "name": "MakeDirectory",
                "choices": [],
                "doc": "Takes a boolean argument. If true, the directories to watch are created before watching. This option is ignored for PathExists= settings. Defaults to false."
            },
            {
                "name": "DirectoryMode",
                "choices": [],
                "doc": "If MakeDirectory= is enabled, use the mode specified here to create the directories in question. Takes an access mode in octal notation. Defaults to 0755."
            }
        ])
    },
    {
        name: "Swap",
        fileMatch: /.+\.swap/,
        doc: 'A unit configuration file whose name ends in ".swap" encodes information about a swap device or file for memory paging controlled and supervised by systemd.',
        settings: execSettings.concat([
            {
                "name": "noauto, auto",
                "choices": [],
                "doc": "With noauto, the swap unit will not be added as a dependency for swap.target. This means that it will not be activated automatically during boot, unless it is pulled in by some other unit. The auto option has the opposite meaning and is the default."
            },
            {
                "name": "nofail",
                "choices": [],
                "doc": "With nofail, the swap unit will be only wanted, not required by swap.target. This means that the boot will continue even if this swap device is not activated successfully."
            },
            {
                "name": "What",
                "choices": [],
                "doc": "Takes an absolute path of a device node or file to use for paging. See swapon(8) for details. If this refers to a device node, a dependency on the respective device unit is automatically created. (See systemd.device(5) for more information.) If this refers to a file, a dependency on the respective mount unit is automatically created. (See systemd.mount(5) for more information.) This option is mandatory. Note that the usual specifier expansion is applied to this setting, literal percent characters should hence be written as \"%%\"."
            },
            {
                "name": "Priority",
                "choices": [],
                "doc": "Swap priority to use when activating the swap device or file. This takes an integer. This setting is optional and ignored when the priority is set by pri= in the Options= key."
            },
            {
                "name": "Options",
                "choices": [],
                "doc": "May contain an option string for the swap device. This may be used for controlling discard options among other functionality, if the swap backing device supports the discard or trim operation. (See swapon(8) for more information.) Note that the usual specifier expansion is applied to this setting, literal percent characters should hence be written as \"%%\"."
            },
            {
                "name": "TimeoutSec",
                "choices": [],
                "doc": "Configures the time to wait for the swapon command to finish. If a command does not exit within the configured time, the swap will be considered failed and be shut down again. All commands still running will be terminated forcibly via SIGTERM, and after another delay of this time with SIGKILL. (See KillMode= in systemd.kill(5).) Takes a unit-less value in seconds, or a time span value such as \"5min 20s\". Pass \"0\" to disable the timeout logic. Defaults to DefaultTimeoutStartSec= from the manager configuration file (see systemd-system.conf(5))."
            }
        ]).toList()
    },
    {
        name: "Timer",
        doc: 'A unit configuration file whose name ends in ".timer" encodes information about a timer controlled and supervised by systemd, for timer-based activation.',
        fileMatch: /.+\.timer$/,
        settings: List<SettingInfo>([
            {
                "name": "OnActiveSec",
                "choices": [],
                "doc": "Defines monotonic timers relative to different starting points: OnActiveSec= defines a timer relative to the moment the timer itself is activated. OnBootSec= defines a timer relative to when the machine was booted up. OnStartupSec= defines a timer relative to when systemd was first started. OnUnitActiveSec= defines a timer relative to when the unit the timer is activating was last activated. OnUnitInactiveSec= defines a timer relative to when the unit the timer is activating was last deactivated.\n\nMultiple directives may be combined of the same and of different types. For example, by combining OnBootSec= and OnUnitActiveSec=, it is possible to define a timer that elapses in regular intervals and activates a specific service each time.\n\nThe arguments to the directives are time spans configured in seconds. Example: \"OnBootSec=50\" means 50s after boot-up. The argument may also include time units. Example: \"OnBootSec=5h 30min\" means 5 hours and 30 minutes after boot-up. For details about the syntax of time spans, see systemd.time(7).\n\nIf a timer configured with OnBootSec= or OnStartupSec= is already in the past when the timer unit is activated, it will immediately elapse and the configured unit is started. This is not the case for timers defined in the other directives.\n\nThese are monotonic timers, independent of wall-clock time and timezones. If the computer is temporarily suspended, the monotonic clock stops too.\n\nIf the empty string is assigned to any of these options, the list of timers is reset, and all prior assignments will have no effect.\n\nNote that timers do not necessarily expire at the precise time configured with these settings, as they are subject to the AccuracySec= setting below."
            },
            {
                "name": "OnCalendar",
                "choices": [],
                "doc": "Defines realtime (i.e. wallclock) timers with calendar event expressions. See systemd.time(7) for more information on the syntax of calendar event expressions. Otherwise, the semantics are similar to OnActiveSec= and related settings.\n\nNote that timers do not necessarily expire at the precise time configured with this setting, as it is subject to the AccuracySec= setting below."
            },
            {
                "name": "AccuracySec",
                "choices": [],
                "doc": "Specify the accuracy the timer shall elapse with. Defaults to 1min. The timer is scheduled to elapse within a time window starting with the time specified in OnCalendar=, OnActiveSec=, OnBootSec=, OnStartupSec=, OnUnitActiveSec= or OnUnitInactiveSec= and ending the time configured with AccuracySec= later. Within this time window, the expiry time will be placed at a host-specific, randomized, but stable position that is synchronized between all local timer units. This is done in order to optimize power consumption to suppress unnecessary CPU wake-ups. To get best accuracy, set this option to 1us. Note that the timer is still subject to the timer slack configured via systemd-system.conf(5)'s TimerSlackNSec= setting. See prctl(2) for details. To optimize power consumption, make sure to set this value as high as possible and as low as necessary."
            },
            {
                "name": "RandomizedDelaySec",
                "choices": [],
                "doc": "Delay the timer by a randomly selected, evenly distributed amount of time between 0 and the specified time value. Defaults to 0, indicating that no randomized delay shall be applied. Each timer unit will determine this delay randomly each time it is started, and the delay will simply be added on top of the next determined elapsing time. This is useful to stretch dispatching of similarly configured timer events over a certain amount time, to avoid that they all fire at the same time, possibly resulting in resource congestion. Note the relation to AccuracySec= above: the latter allows the service manager to coalesce timer events within a specified time range in order to minimize wakeups, the former does the opposite: it stretches timer events over a time range, to make it unlikely that they fire simultaneously. If RandomizedDelaySec= and AccuracySec= are used in conjunction, first the randomized delay is added, and then the result is possibly further shifted to coalesce it with other timer events happening on the system. As mentioned above AccuracySec= defaults to 1min and RandomizedDelaySec= to 0, thus encouraging coalescing of timer events. In order to optimally stretch timer events over a certain range of time, make sure to set RandomizedDelaySec= to a higher value, and AccuracySec=1us."
            },
            {
                "name": "Unit",
                "choices": [],
                "doc": "The unit to activate when this timer elapses. The argument is a unit name, whose suffix is not \".timer\". If not specified, this value defaults to a service that has the same name as the timer unit, except for the suffix. (See above.) It is recommended that the unit name that is activated and the unit name of the timer unit are named identically, except for the suffix."
            },
            {
                "name": "Persistent",
                "choices": ["true", "false"],
                "doc": "Takes a boolean argument. If true, the time when the service unit was last triggered is stored on disk. When the timer is activated, the service unit is triggered immediately if it would have been triggered at least once during the time when the timer was inactive. This is useful to catch up on missed runs of the service when the machine was off. Note that this setting only has an effect on timers configured with OnCalendar=. Defaults to false."
            },
            {
                "name": "WakeSystem",
                "choices": ["true", "false"],
                "doc": "Takes a boolean argument. If true, an elapsing timer will cause the system to resume from suspend, should it be suspended and if the system supports this. Note that this option will only make sure the system resumes on the appropriate times, it will not take care of suspending it again after any work that is to be done is finished. Defaults to false."
            },
            {
                "name": "RemainAfterElapse",
                "choices": ["true", "false"],
                "doc": "Takes a boolean argument. If true, an elapsed timer will stay loaded, and its state remains queriable. If false, an elapsed timer unit that cannot elapse anymore is unloaded. Turning this off is particularly useful for transient timer units that shall disappear after they first elapse. Note that this setting has an effect on repeatedly starting a timer unit that only elapses once: if RemainAfterElapse= is on, it will not be started again, and is guaranteed to elapse only once. However, if RemainAfterElapse= is off, it might be started again if it is already elapsed, and thus be triggered multiple times. Defaults to yes."
            }
        ])
    }
])