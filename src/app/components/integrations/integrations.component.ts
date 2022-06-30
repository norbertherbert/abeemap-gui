import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {

  componentTitle = 'Integrations';

  appServerConnectionsVisible = false;
  networkServerConnectionsVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

}
