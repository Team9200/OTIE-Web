<template>
    <v-container>
        <v-card>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-layout>
                        <h1>Write</h1>
                        <v-spacer></v-spacer>
                        <v-btn @click="submit" class="success">Submit</v-btn>
                    </v-layout>
                    <v-text-field :rules="rules" v-model="title" label="제목" required></v-text-field>
                    <v-text-field :rules="rules" v-model="sha256" label="sha256" required></v-text-field>
                    <v-text-field :rules="rules" v-model="sha1" label="sha1" required></v-text-field>
                    <v-text-field :rules="rules" v-model="md5" label="md5" required></v-text-field>
                    <v-text-field :rules="rules" v-model="filetype" label="파일 타입" required></v-text-field>
                    <!-- <v-text-field :rules="rules" v-model="first_seen" label="첫 발견 날짜" required></v-text-field> -->
                    <!-- <v-text-field v-model="behavior" label="behavior" required></v-text-field> -->

                    <markdown-editor preview-class="markdown-body" v-model="content" ref="markdownEditor"></markdown-editor>
                    <v-combobox :rules="rules" v-model="chips" :items="items" label="태그 입력" chips clearable
                        prepend-icon="filter_list" solo multiple>
                        <template slot="selection" slot-scope="data">
                            <v-chip :selected="data.selected" close @input="remove(data.item)">
                                <strong>{{ data.item }}</strong>&nbsp;
                            </v-chip>
                        </template>
                    </v-combobox>

                </v-container>
            </v-form>
            <br>

        </v-card>
    </v-container>
</template>

<script>
    import hljs from 'highlight.js'
    import {
        APIService
    } from '../../api/APIService'
    window.hljs = hljs;
    import sign from '../../util/sign'

    import markdownEditor from 'vue-simplemde/src/markdown-editor'
    import sha256 from 'sha256'
    import bs58check from 'bs58check'

    const apiService = new APIService()

    export default {
        name: 'write-view',
        data: () => ({
            valid: false,
            title: '',
            sha256: '',
            rules: [
                v => !!v || '입력이 필요합니다.'
            ],
            content: '# Hello World',
            ip: '',
            publickey: '',
            md5: '',
            sha1: '',
            filetype: '',
            analyzer: '',
            collector: '',
            first_seen: '',
            behavior: '',
            filesize: 0,
            tag_name_etc: [],
            chips: [],
            items: ["aasq", "abhw", "aczgysli", "adload", "adposhel", "adpower", "adrotator", "adware", "agent",
                "agentb", "agentwdcr", "ainslot", "allaple", "alman", "almanahe", "alureon", "amonetize",
                "androidos", "andromeda", "archsms", "ardunk", "ardurk", "asjf", "auslogics", "autohk",
                "autoit", "autokms", "autorun", "autoruns", "awmgwepi", "aykncugi", "backboot", "backdoor",
                "badur", "bamital", "banker", "barys", "bendis", "benjamin", "berbew", "betisrypt",
                "bifrose", "bitcoinminer", "bitcovar", "bitminer", "bladabindi", "blocker", "boaxxe",
                "bodegun", "brmon", "browsefox", "btcware", "bundler", "bundpil", "bunitu", "buterat",
                "buzy", "canbis", "ccpk", "cenb", "cerber", "cerbu", "cfecc", "chapak", "chinky", "cinmus",
                "clicker", "clipbanker", "codecpack", "coinminer", "coinstealer", "cosmu", "crcf", "crusis",
                "crypt", "cryptear", "cryptolocker", "cryptor", "cryptredol", "cryptxxx", "cryptz",
                "crysis", "cryxos", "cswc", "csxb", "ctzz", "cucx", "cumt", "cupj", "cycler", "czku",
                "dapato", "darkkomet", "daws", "dcom", "ddos", "dealagent", "dealply", "delf", "dftv",
                "dhnt", "dhrg", "dialer", "dialers", "dinwod", "diple", "diztakun", "doboc", "dokstormac",
                "donoff", "dovs", "downloader", "downloaderguide", "downloadguide", "downloadsponsor",
                "dridex", "dropped", "dropper", "duptwux", "ekstak", "emotet", "emotetc", "encoder",
                "encrypted", "enigma", "epatroa", "escop", "exocrypt", "expl", "exploit", "explorerhijack",
                "eyestye", "fakealert", "fakeapp", "fakeav", "fakebank", "fakejquery", "fareit", "farfli",
                "fdld", "filecoder", "fileinfector", "firseria", "fiseria", "floxif", "flyagent",
                "flystudio", "fraudload", "fsysna", "fujack", "fujacks", "fullscreen", "funweb", "fynloski",
                "gamarue", "gamehack", "gamehuck", "gamevance", "gandcrypt", "ganelp", "generickd",
                "generickds", "generickdz", "generictka", "genpack", "gepys", "glupteba", "graftor",
                "gtgso", "gthzz", "guagua", "gunex", "gvance", "hacktool", "hesv", "heur", "hiddad",
                "hiddentear", "hiddentears", "hllp", "hoax", "hotdownloads", "hqwar", "ichitaro", "iframe",
                "imps", "inject", "injector", "installcore", "installmonster", "installmonstr", "invader",
                "ioehi", "ircbot", "istartsurf", "jacard", "jaik", "jaiko", "jigsaw", "jorik", "jrbe",
                "kazaa", "kazy", "kcmi", "keygen", "keylog", "keylogger", "kmsactivator", "kmsauto",
                "kolab", "kolabc", "koler", "kovter", "kranet", "krap", "krucky", "krypt", "kryptik",
                "lamer", "laroux", "lilu", "lineage", "linkury", "linux", "llac", "lockscreen", "lolbot",
                "looked", "ludbaruma", "lydra", "lynx", "macro", "madangel", "magania", "mailcab", "manalo",
                "marker", "matsnu", "memscan", "metasploit", "meterpreter", "micro", "microfake", "midie",
                "mikey", "mindspark", "minggy", "mira", "mirai", "mobby", "mobilepay", "morstar", "msexcel",
                "msil", "msilkrypt", "msword", "mucc", "mudrop", "mutopy", "mydoom", "mywebsearch", "naffy",
                "nagoot", "nanobot", "nanocore", "neshta", "network_dns", "network_http", "network_netbios",
                "network_ntp", "network_smb_cifs", "network_smtp", "network_soap", "network_ssl",
                "neverquest", "nimnul", "nitol", "noancooe", "noon", "nsanti", "nymaim", "nymeria", "obfus",
                "obfuscated", "packed", "packer", "padodor", "pakes", "palevo", "passwordstealer",
                "passwordstealera", "pasta", "pcclient", "pdfka", "pespin", "phorpiex", "pidief", "piker",
                "pikor", "pincav", "piom", "pioneer", "poison", "poisonivy", "polyransom", "porn",
                "pornvideo", "poweliks", "powload", "prepscram", "prorat", "proxy", "qvod", "ramnit",
                "ransomkd", "ransomware", "razy", "rebhip", "reconyc", "redir", "redirector", "refroso",
                "regrun", "rents", "reyptson", "rimecud", "rincux", "risktool", "riskware", "rootkit",
                "rotator", "rubinurd", "runner", "samas", "scar", "script", "scriptkd", "sdbot",
                "servstart", "seven", "sfpvpkwkg", "sfydg", "shakblades", "shankar", "shaosmine", "shedun",
                "shellini", "shifu", "shipup", "shiz", "simbot", "simda", "sirefef", "sivis", "small",
                "smardf", "smearpasse", "smforw", "smspay", "smsreg", "smssend", "smsspy", "smsthief",
                "softcnapp", "solimba", "spatet", "spyagent", "spyrat", "spyware", "startpage", "startsurf",
                "stealer", "stormattack", "strictor", "stuh", "styricka", "subseven", "swizzor", "swrort",
                "sybd", "symmi", "systweak", "tarodrop", "tdjtbzaae", "tdss", "techsnab", "thus", "tinba",
                "tofsee", "tool", "toolbar", "torntv", "trojan", "trojanspy", "tufik", "tuscas", "tweakbit",
                "ulise", "umpay", "unruy", "unwanted", "upatre", "ursnif", "ursu", "utcaczgysli", "valyria",
                "vawtrak", "vbinder", "vbkrypt", "vbna", "vbran", "vflooder", "viking", "vilsel", "virlock",
                "virtumonde", "virus", "virut", "vobfus", "vsfk", "vtflooder", "vundo", "wabot", "wanna",
                "wannacry", "wannacrypt", "wannacryptor", "waski", "wauchos", "wbna", "wcry", "websearch",
                "windef", "winlock", "worm", "wpakill", "wroba", "yakes", "yontoo", "zaccess", "zamg",
                "zbot", "zboter", "zegost", "zenpak", "zerber", "zlob", "zusy"
            ]
        }),
        components: {
            markdownEditor
        },
        methods: {
            getTracker(ip) {
                apiService.getTracker(ip)
                    .then(response => {
                        this.ip = response.address
                    })
            },
            remove(item) {
                this.chips.splice(this.chips.indexOf(item), 1)
                this.chips = [...this.chips]
            },
            submit() {
                if (this.$refs.form.validate()) {

                    apiService.getProfile().then(response => {
                        this.publickey = response.publickey
                        this.analyzer = response.publickey
                    })

                    var ws = new WebSocket("ws://106.10.43.233:59200");
                    this.chips.forEach(element => {
                        this.tag_name_etc.push({
                            tag: element
                        })
                    });

                    var post = {
                        type: 'post',
                        post: {
                            title: this.title,
                            timestamp: new Date().getTime(),
                            body: {
                                analyzer: this.analyzer,
                                collector: this.collector,
                                md5: this.md5,
                                sha1: this.sha1,
                                sha256: this.sha256,
                                filetype: this.filetype,
                                tag_name_etc: this.tag_name_etc,
                                filesize: this.filesize,
                                behavior: this.behavior,
                                date: new Date().getTime(),
                                first_seen: new Date().getTime() - (60 * 60 * 1000),
                                description: this.content
                            },
                            hashtag: [],
                            publickey: this.publickey,
                            permlink: '01' + sha256(JSON.stringify({
                                date: new Date().getTime(),
                                description: this.content
                            }))
                        }
                    }
                    post['post']['sign'] = sign.signPost(post.post, bs58check.decode(this.$store.getters.privkey))
                    post = JSON.stringify(post)

                    ws.onopen = function open() {
                        ws.send(post)
                    }
                    alert('글이 정상적으로 등록되었습니다.')
                    window.location.href = '/'
                }
            },
            getPublicKey() {
                apiService.getProfile().then(response => {
                    this.publickey = response.profile.publickey
                    this.analyzer = response.profile.publickey
                })
            }
        },
        created() {
            if (this.$store.getters.isAuthenticated) {
                this.getPublicKey()
            }
        }
    }
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
    @import '~github-markdown-css';
    @import '~highlight.js/styles/atom-one-dark.css';
</style>