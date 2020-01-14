import { Component } from '@angular/core';
import { modem, userReportedModem } from './modem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  anchors = [
    { id: 'hero', name: 'What is Cable Haunt' },
    { id: "how-it-works", name: "How it Works" },
    { id: "questions-and-answers", name: "FAQ" },
  ];

  scrollLimit: number = 100;
  scrolled: boolean = false;

  expanded: boolean[] = [false, false, false, false, false, false, false, false, false, false, false];


  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  expand(index: number) {
    this.expanded[index] = true;
  }

  deExpand(index: number) {
    this.expanded[index] = false;
  }

  toggleExpand(index: number) {
    this.expanded[index] = !this.expanded[index];
  }

  scroll = (event: any): void => {
    this.scrolled = event.srcElement.scrollTop > this.scrollLimit;
  }

  scrollTo(id: string) {
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: "smooth" });
  }

  scrollToCenter(id: string) {
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: "smooth", inline: "center", block: "center" });
  }

  scrollToAndExpand(id: string, index: number) {
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: "smooth" });
    this.expand(index);
    //el.nextSibling. = true;
  }

  expandAndScrollTo(id: string, index: number) {
    this.expand(index);
    let el = document.getElementById(id);
    setTimeout(function () {
      el.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }

  scrollToExpandScrollTo(firstId: string, secondId: string, index: number) {
    let delay = 0;
    if (!this.expanded[index]) {
      let el1 = document.getElementById(firstId);
      el1.scrollIntoView({ behavior: "smooth" });
      this.expand(index);
      delay = 1000;
    }
    let el2 = document.getElementById(secondId);
    setTimeout(function () {
      el2.scrollIntoView({ behavior: "smooth" });
    }, delay);
  }

  displayedColumns: string[] = ['model', 'firmwareVersion', 'port', 'defaultUser'];
  displayedUserReportedModemColumns: string[] = ['model', 'firmwareVersion', 'port', 'defaultUser', 'isp'];

  vulnerableModems: modem[] = [
    {
      model: 'Sagemcom F@st 3890',
      firmwareVersion: '50.10.19.*',
      port: '6080',
      defaultUser: 'spectrum:spectrum (Authorization: Basic)'
    }, {
      model: 'Sagemcom F@st 3686',
      firmwareVersion: 'SIP_3.428.0-*',
      port: '6080',
      defaultUser: 'spectrum:spectrum (Authorization: Basic)'
    }, {
      model: 'Technicolor TC7230',
      firmwareVersion: 'STEB 01.25',
      port: '8080',
      defaultUser: 'No authorization needed'
    }, {
      model: 'Netgear C6250EMR',
      firmwareVersion: 'V2.01.05',
      port: '8080',
      defaultUser: 'No authorization needed'
    }, {
      model: 'Netgear CG3700EMR',
      firmwareVersion: 'V2.01.03',
      port: '8080',
      defaultUser: 'No authorization needed'
    }, {
      model: 'Sagemcom F@st 3890',
      firmwareVersion: '05.76.6.3a',
      port: 'unknown',
      defaultUser: 'unknown'
    }, {
      model: 'Sagemcom F@st 3686',
      firmwareVersion: '4.83.0',
      port: 'unknown',
      defaultUser: 'unknown'
    }, {
      model: 'COMPAL 7284E',
      firmwareVersion: '5.510.5.11',
      port: 'unknown',
      defaultUser: 'unknown'
    }, {
      model: 'COMPAL 7486E',
      firmwareVersion: '5.510.5.11',
      port: 'unknown',
      defaultUser: 'unknown'
    }, {
      model: 'Netgear CG3700EMR',
      firmwareVersion: 'V2.01.05',
      port: '8080',
      defaultUser: 'No authorization needed'
    }
  ]

  communityVulnerableModems: userReportedModem[] = [
    {
      model: 'Technicolor TC4400',
      firmwareVersion: 'SR70.12.33-180327',
      port: '8080',
      defaultUser: 'admin:bEn2o#US9s (Authorization: Basic)',
      isp: 'unknown'
    }, {
      model: 'Arris Surfboard SB8200',
      firmwareVersion: '0200.174F.311915',
      port: '8080',
      defaultUser: 'No authorization needed',
      isp: 'Comcast'
    }, {
      model: 'Arris Surfboard CM8200A',
      firmwareVersion: 'unknown',
      port: 'unknown',
      defaultUser: 'unknown',
      isp: 'Comcast'
    }, {
      model: 'Arris Surfboard SB6183­',
      firmwareVersion: 'D30CM-OSPREY-2.4.0.1-GA-02-NOSH',
      port: '8080',
      defaultUser: 'No authorization needed',
      isp: 'COX US and Spectrum'
    }, {
      model: 'Netgear CM1000*',
      firmwareVersion: 'V6.01.02',
      port: '8080',
      defaultUser: 'admin:password (Authorization: Basic)/no authorization needed - ISP Dependent (Changeable)',
      isp: 'COX US and Comcast'
    },{
      model: 'Netgear CM600',
      firmwareVersion: 'V1.01.14',
      port: '49200',
      defaultUser: 'No authorization needed',
      isp: 'Spectrum and others'
    },
    {
      model: 'Humax HGB10R-02',
      firmwareVersion: 'BRGCAB 1.0.03',
      port: '8080',
      defaultUser: 'No authorization needed',
      isp: 'NET CLARO Brazil­'
    }, {
      model: 'Technicolor TC7300',
      firmwareVersion: 'STF3.31.11­',
      port: '8080',
      defaultUser: 'No authorization needed',
      isp: 'Claro Colombia­'
    }, {
    
      model: 'Cisco EPC3928AD',
      firmwareVersion: 'e3928A-E10-5',
      port: '8080',
      defaultUser: 'No authorization needed',
      isp: 'Ziggo'
    },
    {
      model: 'Technicolor TC7200',
      firmwareVersion: 'STDC.01.31',
      port: '8080',
      defaultUser: 'No authorization needed',
      isp: 'Pÿur'
    }
  ]
}
