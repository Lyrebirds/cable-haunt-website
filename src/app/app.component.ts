import { Component, OnInit, ViewChild } from '@angular/core';
import { modem, userReportedModem } from './modem';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';
  anchors = [
    { id: 'hero', name: 'What is Cable Haunt' },
    { id: "how-it-works", name: "How it Works" },
    { id: "questions-and-answers", name: "FAQ" },
  ];

  scrollLimit: number = 100;
  scrolled: boolean = false;

  expanded: boolean[] = [false, false, false, false, false, false, false, false, false, false, false];

  @ViewChild('vulnerableModemsPaginator', { static: true }) paginator: MatPaginator;
  @ViewChild('communityVulnerableModemsPaginator', { static: true }) communityPaginator: MatPaginator;
  @ViewChild('vulnerableModemsTable', { static: true }) sort: MatSort;
  @ViewChild('communityVulnerableModemsTable', { static: true }) communitySort: MatSort;

  displayedColumns: string[] = ['model', 'firmwareVersion', 'port', 'defaultUser'];
  displayedUserReportedModemColumns: string[] = ['model', 'firmwareVersion', 'port', 'defaultUser', 'isp'];
  communityVulnerableModemsDataSource = new MatTableDataSource<userReportedModem>(communityVulnerableModems);
  vulnerableModemsDataSource = new MatTableDataSource<modem>(vulnerableModems);

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
    this.sort.sort(({ id: 'model', start: 'asc' }) as MatSortable);
    this.communitySort.sort(({ id: 'model', start: 'asc' }) as MatSortable);
    this.communityVulnerableModemsDataSource.paginator = this.communityPaginator;
    this.vulnerableModemsDataSource.paginator = this.paginator;
    this.communityVulnerableModemsDataSource.sort = this.communitySort;
    this.vulnerableModemsDataSource.sort = this.sort;
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

  applyFilterISP(filterValue: string) {
    this.vulnerableModemsDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterCommunity(filterValue: string) {
    this.communityVulnerableModemsDataSource.filter = filterValue.trim().toLowerCase();
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
}

const vulnerableModems: modem[] = [
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
    port: 'Unknown',
    defaultUser: 'Unknown'
  }, {
    model: 'Sagemcom F@st 3686',
    firmwareVersion: '4.83.0',
    port: 'Unknown',
    defaultUser: 'Unknown'
  }, {
    model: 'COMPAL 7284E',
    firmwareVersion: '5.510.5.11',
    port: 'Unknown',
    defaultUser: 'Unknown'
  }, {
    model: 'COMPAL 7486E',
    firmwareVersion: '5.510.5.11',
    port: 'Unknown',
    defaultUser: 'Unknown'
  }, {
    model: 'Netgear CG3700EMR',
    firmwareVersion: 'V2.01.05',
    port: '8080',
    defaultUser: 'No authorization needed'
  }
]

const communityVulnerableModems: userReportedModem[] = [
  {
    model: 'Technicolor TC4400',
    firmwareVersion: 'SR70.12.33-180327',
    port: '8080',
    defaultUser: 'admin:bEn2o#US9s (Authorization: Basic)',
    isp: 'Unknown'
  }, {
    model: 'Arris Surfboard SB8200',
    firmwareVersion: '0200.174F.311915 and D31CM-PEREGRINE-1.1.1.0-GA-11-NOSH­',
    port: '8080',
    defaultUser: 'No authorization needed',
    isp: 'Comcast, Spectrum and WOW!'
  }, {
    model: 'Arris Surfboard CM8200A',
    firmwareVersion: 'D31CM-PEREGRINE-1.0.1.0-GA-04-NOSH',
    port: '8080',
    defaultUser: 'admin:password',
    isp: 'Comcast and RCN'
  }, {
    model: 'Arris Surfboard SB6183­',
    firmwareVersion: 'D30CM-OSPREY-2.4.0.1-GA-02-NOSH and SB6183-9.2.0.0-GA-04-37-NOSH­',
    port: '8080',
    defaultUser: 'No authorization needed',
    isp: 'COX US, Spectrum and RCN'
  }, {
    model: 'Netgear CM1000*',
    firmwareVersion: 'V6.01.02',
    port: '8080',
    defaultUser: 'admin:password (Authorization: Basic)/no authorization needed - ISP Dependent (Changeable)',
    isp: 'COX US, Comcast, Sparklight, and Spectrum'
  }, {
    model: 'Netgear CM1150',
    firmwareVersion: 'V2.02.04',
    port: '8080',
    defaultUser: 'admin:password (Authorization: Basic) (Changeable)',
    isp: 'Comcast'
  }, {
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
    firmwareVersion: 'e3928A-E15-5-E122-c5210r55113-160318ce3928A-E15-5-E122-c5210r55113-160318c',
    port: '8080',
    defaultUser: 'No authorization needed',
    isp: 'Ziggo and Elisa'
  },
  {
    model: 'Technicolor TC7200',
    firmwareVersion: 'STDC.01.31 and STCF.01.44­',
    port: '8080',
    defaultUser: 'No authorization needed',
    isp: 'PŸUR, Citycable, and UPC'
  },
  {
    model: 'Technicolor TC7650',
    firmwareVersion: '1.0.3 Build 20161117',
    port: '8080',
    defaultUser: 'admin:admin (Authorization: Basic) (Same as admin console, even if custom)',
    isp: 'Unknown'
  },
  {
    model: 'Technicolor CGA2121',
    firmwareVersion: 'CGA2121E-ES-13-E113C5-c7410r5714-190513',
    port: '8080',
    defaultUser: 'No authorization needed',
    isp: 'Serbia BroadBand'
  },
  {
    model: 'Sagemcom F@st 3686 V2.2',
    firmwareVersion: 'AKADO-SIP_3.436.0­',
    port: '8080',
    defaultUser: 'No authorization needed',
    isp: 'AKADO'
  },
  {
    model: 'Netgear CM500',
    firmwareVersion: 'V1.01.09­',
    port: '8080',
    defaultUser: 'No authorization needed',
    isp: 'Spectrum'
  },
  {
    model: 'Technicolor TC7210',
    firmwareVersion: 'STEF.01.36',
    port: '8080',
    defaultUser: 'No authorization needed',
    isp: 'R Cable y Telecable Telecomunicaciones (Spain) and Kabelplus (Austria)'
  },
  {
    model: 'SMC Electronics SMC D3-CCR-v2',
    firmwareVersion: '1.4.0.49-biz',
    port: '8080',
    defaultUser: 'admin:password (Authorization: Basic)',
    isp: 'Xfinity (Comcast)'
  },
  {
    model: 'Zoom 5370',
    firmwareVersion: '5370-5.5.10.1',
    port: '22267',
    defaultUser: 'No authorization needed',
    isp: 'Spectrum'
  },
  {
    model: 'Cisco/Technicolor DPC3216',
    firmwareVersion: 'd3216-P15-12-c6000r55103-160105a',
    port: '8080',
    defaultUser: 'No authorization needed',
    isp: 'Spectrum'
  },
  {
    model: 'Netgear CG3100',
    firmwareVersion: 'Unknown',
    port: 'Unknown',
    defaultUser: 'Unknown',
    isp: 'VOO (Reboot will apply a patch)'
  }
]
