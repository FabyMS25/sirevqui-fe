import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { GlobalComponent } from 'src/app/global-component';
import { FAQCategory, TREE_DATA } from './estructure';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
  ],
})

export class FaqsComponent implements OnInit {
  treeControl = new NestedTreeControl<ComplexNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ComplexNode>();

  superAdmin= GlobalComponent.super_admin;
  faqCategory = FAQCategory

  
  constructor() {
    this.dataSource.data = TREE_DATA
  }

  ngOnInit(): void {}

  hasChild = (_: number, node: ComplexNode) => !!node.children && node.children.length > 0;

  sendEmail() {
    const email = this.superAdmin.email;
    const subject = 'Consulta sobre Preguntas Frecuentes';
    const body = 'Hola, tengo una consulta sobre...';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  
  sendWhatsApp() {
    const phoneNumber = this.superAdmin.whatsApp; 
    const message = 'Hola, tengo una consulta sobre las Preguntas Frecuentes.';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }

}
interface ComplexNode {
  name: string;
  children?: ComplexNode[];
}
