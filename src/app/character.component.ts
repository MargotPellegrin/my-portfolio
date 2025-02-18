import { Component, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements AfterViewInit {
    @ViewChild('Pupils', { static: false })
    pupils!: ElementRef;

    @ViewChild('Eyelashes', { static: false })
    eyelashes!: ElementRef;

    @ViewChild("Eyeshadows", { static: false })
    eyeshadows!: ElementRef;

    @ViewChild("MainHair", { static: false })
    mainHair!: ElementRef;

    @ViewChild("FrontHairR", { static: false })
    frontHairR!: ElementRef;

    @ViewChild("FrontHairL", { static: false })
    frontHairL!: ElementRef;

    leftFullPupil!: SVGAElement;
    rightFullPupil!: SVGAElement;
    leftPupil!: SVGAElement;
    rightPupil!: SVGAElement;

    rightEyeLashes!: SVGAElement;
    leftEyeLashes!: SVGAElement;

    ngAfterViewInit() {
        const pupilsGroup = this.pupils.nativeElement;
        const eyelashesGroup = this.eyelashes.nativeElement;
        this.leftFullPupil = pupilsGroup.querySelector('#pupil_full_L') as SVGAElement;
        this.rightFullPupil = pupilsGroup.querySelector('#pupil_full_R') as SVGAElement;
        this.leftPupil = pupilsGroup.querySelector('#pupil_L') as SVGAElement;
        this.rightPupil = pupilsGroup.querySelector('#pupil_R') as SVGAElement;
        this.leftEyeLashes = eyelashesGroup.querySelector('#eyelash_L') as SVGAElement;
        this.rightEyeLashes = eyelashesGroup.querySelector('#eyelash_R') as SVGAElement;
        
        setTimeout(() => this.animateEyelashes(), 0);
        setTimeout(() => this.animateHair(), 0);
    }

    animateHair() {
        setTimeout(() => {
            const hairElement = this.mainHair.nativeElement;
            const upHairElementR = this.frontHairR.nativeElement;
            const upHairElementL = this.frontHairL.nativeElement;
            const hairRect = hairElement.getBoundingClientRect();
            const hairCenterX = hairRect.left + hairRect.width / 2;
            const hairCenterY = hairRect.top + hairRect.height / 4;

            hairElement.style.transformOrigin = `${hairCenterX}px ${hairCenterY}px`;
            upHairElementR.style.transformOrigin = `${hairCenterX}px ${hairCenterY}px`;
            upHairElementL.style.transformOrigin = `${hairCenterX}px ${hairCenterY}px`;

            hairElement.animate([
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(2deg)' },
                { transform: 'rotate(-2deg)' },
                { transform: 'rotate(0deg)' }
            ], {
                duration: 5000,
                iterations: Infinity,
                easing: 'linear'
            });

            upHairElementR.animate([
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(1deg)' },
                { transform: 'rotate(-1deg)' },
                { transform: 'rotate(0deg)' }
            ], {
                duration: 5000,
                iterations: Infinity,
                easing: 'linear'
            });

            upHairElementL.animate([
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(1deg)' },
                { transform: 'rotate(-1deg)' },
                { transform: 'rotate(0deg)' }
            ], {
                duration: 5000,
                iterations: Infinity,
                easing: 'linear'
            });
        });
    }
    getPupilCenters() {
        const leftPupilRect = this.leftPupil.getBoundingClientRect();
        const rightPupilRect = this.rightPupil.getBoundingClientRect();

        const leftPupilCenter = {
            x: leftPupilRect.left + leftPupilRect.width / 2,
            y: leftPupilRect.top + leftPupilRect.height / 2
        };

        const rightPupilCenter = {
            x: rightPupilRect.left + rightPupilRect.width / 2,
            y: rightPupilRect.top + rightPupilRect.height / 2
        };

        return { leftPupilCenter, rightPupilCenter };
    }

    getPupilRadius() {
        const leftPupilRect = this.leftPupil.getBoundingClientRect();

        return leftPupilRect.width / 2;
    }

    animateEyelashes() {
        const pupilRadius = this.getPupilRadius();

        const keyframes = [
            { transform: `translateY(0px)` },
            { transform: `translateY(${pupilRadius}px)` },
            { transform: `translateY(0px)` }
        ];

        const options = {
            duration: 500,
            iterations: 1,
            easing: 'ease-in-out'
        };

        const delay = 4500;

        const animateWithDelay = () => {
            this.rightEyeLashes.animate(keyframes, options);
            this.leftEyeLashes.animate(keyframes, options);
            this.eyeshadows.nativeElement.animate(keyframes, options);
            setTimeout(animateWithDelay, delay);
        };

        animateWithDelay();
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const leftPupilCenter = this.getPupilCenters().leftPupilCenter;
        const rightPupilCenter = this.getPupilCenters().rightPupilCenter;

        const angleLeftPupil = Math.atan2(mouseY - leftPupilCenter.y, mouseX - leftPupilCenter.x);
        const angleRightPupil = Math.atan2(mouseY - rightPupilCenter.y, mouseX - rightPupilCenter.x);

        const pupilRadius = this.getPupilRadius();
        const maxPupilMovementX = pupilRadius;
        const maxPupilMovementY = pupilRadius*0.6;

        const distanceLeftPupil = Math.hypot(mouseX - leftPupilCenter.x, mouseY - leftPupilCenter.y);
        const distanceRightPupil = Math.hypot(mouseX - rightPupilCenter.x, mouseY - rightPupilCenter.y);

        const leftPupilX = leftPupilCenter.x + ( Math.min(maxPupilMovementX, Math.max(-maxPupilMovementX, distanceLeftPupil * Math.cos(angleLeftPupil))) );
        const leftPupilY = leftPupilCenter.y + (Math.min(maxPupilMovementY, Math.max(-maxPupilMovementY*0.6, distanceLeftPupil * Math.sin(angleLeftPupil))) );

        const rightPupilX = rightPupilCenter.x + ( Math.min(maxPupilMovementX, Math.max(-maxPupilMovementX, distanceRightPupil * Math.cos(angleRightPupil))) );
        const rightPupilY = rightPupilCenter.y + ( Math.min(maxPupilMovementY, Math.max(-maxPupilMovementY*0.6, distanceRightPupil * Math.sin(angleRightPupil))) );

        this.leftFullPupil.style.transition = 'transform 0.5s';
        this.rightFullPupil.style.transition = 'transform 0.5s';

        this.leftFullPupil.style.transform = `translate(${leftPupilX - leftPupilCenter.x}px, ${leftPupilY - leftPupilCenter.y}px)`;
        this.rightFullPupil.style.transform = `translate(${rightPupilX - rightPupilCenter.x}px, ${rightPupilY - rightPupilCenter.y}px)`;
    }

}
