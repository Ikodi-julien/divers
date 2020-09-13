#!/usr/bin/python3
#coding:utf-8

import subprocess
import os
from threading import Thread
import time

from tkinter import *
import tkinter.ttk as ttk

DIR_TO_BACKUP = {
    "<Nom_1>" : "<indiquer le chemin du répertoire>",
    "<Nom_2>" : "<indiquer le chemin du répertoire>",
    "<Nom_3>" : "<indiquer le chemin du répertoire>",
}

BACKUP_DEST = {
    "<Nom_destination_1>" : "<indiquer le chemin du répertoire>",
    "<Nom_destination_2>" : "<indiquer le chemin du répertoire>",
    "<Nom_destination_3>" : "<indiquer le chemin du répertoire>",
}


class Fenetre:
    def __init__(self, master, title):
        self.master = master
        master.title(title)
        master.geometry('1000x440')

        # Destination de la sauvegarde:
        labelDestination = Label(master, text = "Destination sauvegarde")
        labelDestination.grid(row=0, column=0, sticky=W)

        listeDestination= list(BACKUP_DEST.keys())

        self.listeDestination = ttk.Combobox(master, values=listeDestination)
        
        self.listeDestination.current(0)
        self.listeDestination.grid(row=1, column=0, sticky=W)

        # Répertoire à sauvegarder:
        labelRepertoire = Label(master, text = "Répertoire à sauvegarder")
        labelRepertoire.grid(row=0, column=1, sticky=W)

        listeRepertoire = list(DIR_TO_BACKUP.keys())

        self.listeRepertoire = ttk.Combobox(master, values=listeRepertoire)
        
        self.listeRepertoire.current(0)
        self.listeRepertoire.grid(row=1, column=1, sticky=W)


        # Affichage info avec scrollbar
        self.scrollbar = Scrollbar(master, width=20)
        self.scrollbar.grid(row=2, column=3, sticky=NS)
        self.cadre_sup = Listbox(master, yscrollcommand=self.scrollbar.set, width=120, height=20)
        self.cadre_sup.grid(row=2, column=0, columnspan=3, sticky=NSEW)
        self.scrollbar.config(command=self.cadre_sup.yview)
        
        # Les boutons
        self.button_quit = Button(self.master, text='Quitter', command=exit)
        self.button_quit.grid(row=3, column=2, sticky=W)
        self.button_ok = Button(self.master, text='GO', command=lambda:progress(self))
        self.button_ok.grid(row=3, column=1, sticky=E)

        # La barre de progression
        self.progressbar = ttk.Progressbar(master, orient=HORIZONTAL, mode='indeterminate')
        self.progressbar.grid(row=3, column=0, sticky=EW)


class Backup(Thread):
    def __init__(self, fenetre):
        Thread.__init__(self)
        self.fenetre = fenetre

    def run(self):
        fenetre = self.fenetre
        cadre = fenetre.cadre_sup
        # progressbar
        fenetre.progressbar.start()

        # -------------------création nom futur backup 'sauv_auto_yy_yd_hh_mn' :---------------
        moment = time.localtime()

        # On garde les deux derniers caractères de l'année :
        yy = str(moment.tm_year)
        yy = yy[2:4]

        # On met le nmr du jour sur 3 caractères :
        if len(str(moment.tm_yday)) < 3:
            if len(str(moment.tm_yday)) < 2:
                yd = "00{}".format(moment.tm_yday)
            else:
                yd = "0{}".format(moment.tm_yday)
        else :
            yd = moment.tm_yday

        # On met les heures sur 2 caractères :
        if len(str(moment.tm_hour)) < 2:
            hh = "0{}".format(moment.tm_hour)
        else:
            hh = moment.tm_hour

        # on met les mn sur deux caractères :
        if len(str(moment.tm_min)) < 2:
            mn = "0{}".format(moment.tm_min)
        else:
            mn = moment.tm_min

        date = "{}{}{}{}".format(yy, yd, hh, mn)
        name_backup = "/sauv_auto_{}".format(date)


        #--------------------Préparation répertoire sauvegarde--------------------------------
        # On regarde si une sauvegarde existe, si oui on renomme le dossier avec le nom du jour,
        # si non, on créé le dossier avec le nom du jour :
        liste_reps = []
        choix_dir_to_backup_to = fenetre.listeDestination.get()

        for fichier in os.listdir(BACKUP_DEST[choix_dir_to_backup_to]):
            liste_reps.append(fichier)

        try:
            len(liste_reps) <= 1 #On vérifie qu'il n'y a qu'un dossier de sauvegarde max
        except:
            cadre.insert(END, "/!\\ Trop de dossiers dans le répertoire de sauvegarde /!\\")
            pass

        if len(liste_reps): #on renomme le dossier s'il y en a un
            cadre.insert(END, "##### On renomme l'ancienne sauvegarde ####")
            mv_cmd = "mv -T {}/{} {}{}".format(BACKUP_DEST[choix_dir_to_backup_to], liste_reps[0], BACKUP_DEST[choix_dir_to_backup_to], name_backup)
            cadre.insert(END, "Exécution de : {}".format(mv_cmd))

            try:
                with subprocess.Popen(mv_cmd, shell=True, stderr=subprocess.PIPE, text=True, bufsize=1) as sub:
                    for line in sub.stderr:
                        cadre.insert(END, "{}\n".format(line))
                cadre.insert(END, "OK")
                
            except:
                cadre.insert(END, "/!\\ Erreur au moment de renommer le répertoire /!\\")

        
        else : # Pas de sauvegarde ou trop de dossiers, on créé un nouveau dossier.
            cadre.insert(END, "##### On créé le 1er dossier de sauvegarde ####")
            mkdir_cmd = "mkdir {}/{}".format(BACKUP_DEST[choix_dir_to_backup_to], name_backup)
            cadre.insert(END, "Exécution de : {}".format(mkdir_cmd))

            try:
                with subprocess.Popen(mkdir_cmd, shell=True, stderr=subprocess.PIPE, text=True, bufsize=1) as sub:
                    for line in sub.stderr:
                        cadre.insert(END, "{}\n".format(line))
                cadre.insert(END, "Fin prepa sauvegarde")
                
            except:
                cadre.insert(END, "/!\\ Création répertoire non effectuée /!\\")

        #-------------------Préparation du répertoire de destination-------------------:
        # Je veux pas avoir plein de dossiers différents si le répertoire à sauvegarder est pas le même, donc :

        choix_rep_to_backup = fenetre.listeRepertoire.get()

        # Fabrication de la destination du backup :
        dir_to_backup_to = BACKUP_DEST[choix_dir_to_backup_to] + name_backup
        cadre.insert(END, "Destination backup : {}".format(dir_to_backup_to))

        ####################### on lance r-sync #########################

        rsync_cmd = "rsync -rlt --relative {} {}".format(DIR_TO_BACKUP[choix_rep_to_backup], dir_to_backup_to)
        cadre.insert(END, "############ R_SYNC ##########")
        
        cadre.insert(END, "Exécution de : {}".format(rsync_cmd))

        try:
            with subprocess.Popen(rsync_cmd, shell=True, stderr=subprocess.PIPE, universal_newlines=True) as sub:
                for line in sub.stderr:
                    cadre.insert(END, "{}".format(line))
                cadre.insert(END, "Fin r-sync")

        except:
            cadre.insert(END, "/!\\ R_SYNC n'a rien fait /!\\")
        
        cadre.insert(END, "##### FIN DES OPERATIONS ####")

        # Stop progressbar
        fenetre.progressbar.stop()


        

def progress(fenetre):
    # Thread pour l'affichage
    thread_1 = Backup(fenetre)
    thread_1.start()
    return thread_1




if __name__ == "__main__":

    # Création de la fenêtre:

    root = Tk()
    fenetre_1 = Fenetre(root, 'Backup')
    
    root.mainloop()
    thread_1.join()
